import { Button } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfoBlock from "../../src/components/blocks/InfoBlock";
import Sidebar from "../../src/components/Sidebar";
import { useCookies } from "react-cookie";

export const getServerSideProps = async (ctx) => {
  const isLoggedIn = ctx.req.headers.cookie;
  if (
    isLoggedIn === "token=null" ||
    isLoggedIn === "token=undefined" ||
    !isLoggedIn
  ) {
    return { props: { data: false } };
  } else {
    const token = ctx.req.headers.cookie.split("=")[1];
    const id = ctx.query.id;
    const url = `${process.env.API_URI}/lectures/${id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(url, options);

    let data;
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      data = {
        success: false,
        message: message,
        status: res.status,
      };
    } else {
      data = await res.json();
    }

    return { props: { data } };
  }
};

const singleLecture = ({ data }) => {
  const router = useRouter();
  useEffect(() => {
    if (!data || data === false) {
      router.push("/login");
    }
  }, []);
  const { id } = router.query;

  let weekday = [];
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  const [deleting, setDeleting] = useState(false);
  const [response, setResponse] = useState("");
  const [cookies] = useCookies(["token"]);
  const deleteLecture = async (e) => {
    e.preventDefault();
    setDeleting(true);
    const url = `${process.env.NEXT_PUBLIC_API_URI}/lectures/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookies.token}`,
      },
    };

    try {
      const res = await fetch(url, options);
      const resJson = await res.json();
      if (resJson.success === true) {
        setResponse(resJson.message);
        router.push("/lectures");
        setDeleting(false);
      } else {
        console.log(resJson.message);
        setResponse(resJson.message);
        setDeleting(false);
      }
    } catch (e) {
      console.log(e);
      const message = `An error has occured: 50X`;
      setResponse(message);
      setDeleting(false);
    }
  };
  return (
    <>
      <Head>
        <title>Conceptometry | {data ? data.message[0].name : "Lecture"}</title>
      </Head>
      <Sidebar>
        <>
          {data && data.success === true ? (
            <>
              <div className="container" style={{ margin: 0, padding: 0 }}>
                <div className="mx-3 my-2 d-flex justify-content-between">
                  <h3 className="my-auto">{data.message[0].name}</h3>
                  <div>
                    <p className="my-auto">By {data.message[0].byUser.name}</p>
                    {data.message[0].type === "extra" && (
                      <>
                        <span className="badge rounded-pill bg-warning text-dark">
                          Extra
                        </span>
                      </>
                    )}
                    {data.message[0].type === "regular" && (
                      <>
                        <span className="badge rounded-pill bg-info text-dark">
                          Regular
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <hr />
                <div className="d-md-flex mx-3 mt-3">
                  <InfoBlock name="Name" info={data.message[0].name} />
                  <InfoBlock
                    name="Duration"
                    info={`${data.message[0].duration} minutes`}
                  />
                </div>
                <div className="d-md-flex mx-3 mt-3 ">
                  <InfoBlock name="Day" info={weekday[data.message[0].day]} />
                  <InfoBlock name="Time" info={data.message[0].time} />
                </div>
                <div className="d-md-flex mx-3 mt-3 mb-2">
                  <InfoBlock
                    name="Subjects"
                    info={data.message[0].subject.map((m) => m + ", ")}
                  />
                  <InfoBlock
                    name="Students"
                    info={data.message[0].student.map((m) => m.name + ", ")}
                  />
                </div>
                <div className="d-flex mx-3 my-2">
                  <button className="btn btn-primary bg-gradient btn-block w-100 mx-2">
                    Edit Lecture
                  </button>

                  {deleting === true ? (
                    <>
                      <button
                        onClick={deleteLecture}
                        className="btn btn-danger bg-gradient btn-block w-100 mx-2"
                      >
                        <span
                          className="spinner-border spinner-border-sm my-auto mx-auto"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={deleteLecture}
                        className="btn btn-danger bg-gradient btn-block w-100 mx-2"
                      >
                        Delete Lecture
                      </button>
                    </>
                  )}
                </div>
                {response && (
                  <>
                    <p className="text-center">{response}</p>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <p>{data.message}</p>
            </>
          )}
        </>
      </Sidebar>
    </>
  );
};

export default singleLecture;
