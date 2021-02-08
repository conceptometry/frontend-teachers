import { useRouter } from "next/router";
import Link from "next/link";
import Sidebar from "../../src/components/Sidebar";
import Head from "next/head";
import InfoBlock from "../../src/components/blocks/InfoBlock";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
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
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(
      `${process.env.API_URI}/assignments/${id}`,
      options
    );
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
const SingleAssignment = ({ data }) => {
  let router = useRouter();
  useEffect(() => {
    if (!data || data === false) {
      router.push("/login");
    }
  }, []);
  const { id } = router.query;

  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState("");
  const [cookies] = useCookies(["token"]);
  const deleteAssignment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const url = `${process.env.NEXT_PUBLIC_API_URI}/assignments/${router.query.id}`;
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
        router.push("/assignments");
        setSubmitting(false);
      } else {
        console.log(resJson.message);
        setResponse(resJson.message);
        setSubmitting(false);
      }
    } catch (e) {
      console.log(e);
      setResponse(e.message);

      setSubmitting(false);
    }
  };
  let formattedDate;
  let formattedCreatedAt;

  if (data) {
    const dueDate = new Date(data.message.dueDate);
    formattedDate =
      dueDate.getDate() +
      "/" +
      (dueDate.getMonth() + 1) +
      "/" +
      dueDate.getFullYear();
    const createdAt = new Date(data.message.createdAt);
    formattedCreatedAt =
      createdAt.getDate() +
      "/" +
      (createdAt.getMonth() + 1) +
      "/" +
      createdAt.getFullYear();
  }
  return (
    <>
      <Head>
        <title>Conceptometry | {data ? data.message.name : "Assignment"}</title>
      </Head>
      <Sidebar>
        <>
          {data && data.success === true ? (
            <>
              <h2 className="mx-4 mt-2">{data.message.name}</h2>
              <hr />
              <h3 className="mx-4">Description</h3>
              <p className="mx-4 my-1 mt-1" style={{ fontSize: 16 }}>
                {data.message.description}
              </p>
              <hr />
              <h3 className="mx-4">Students</h3>
              {data.message.student.map((s, i) => (
                <p className="mx-4 my-1 mt-1" key={i} style={{ fontSize: 16 }}>
                  {`${s.name},`}
                </p>
              ))}
              <hr />
              <br />
              <div className="d-flex flex-lg-row flex-column mx-3">
                <InfoBlock name={"Due Date"} info={formattedDate} />
                <InfoBlock name={"Teacher"} info={data.message.byUser.name} />
              </div>
              <div className="d-flex flex-lg-row flex-column mx-3 mt-lg-3">
                <div
                  className="w-100 border border-primary border-2 bg-infoblock p-3 mx-md-2 d-flex flex-column mt-lg-0 mt-3"
                  style={{ borderRadius: 12, minHeight: 190 }}
                >
                  <p className="mx-auto mt-3" style={{ fontSize: 18 }}>
                    {"Reference Materials"}
                  </p>

                  {data.message.teacherMaterials ===
                  "No file has been uploaded" ? (
                    <>
                      <p
                        className="m-auto text-center"
                        style={{ fontSize: 26, fontWeight: 500 }}
                      >
                        No file has been uploaded yet
                      </p>
                    </>
                  ) : (
                    <>
                      <a
                        href={data.message.teacherMaterials}
                        target="_blank"
                        rel="noopener noreferrer nofollow noindex"
                        className="m-auto text-center"
                        style={{ fontSize: 26, fontWeight: 500 }}
                      >
                        Click Here
                      </a>
                    </>
                  )}
                </div>
                <InfoBlock name={"Created At"} info={formattedCreatedAt} />
              </div>
              <div className="d-flex flex-column flex-md-row mx-3 mt-3">
                <Button
                  variant="outlined"
                  size="medium"
                  className="mx-0 mx-md-1 w-100 outline-none bg-primary bg-gradient text-white"
                >
                  Edit Assignment
                </Button>
                <Link href={`/assignments/submissions/${id}`}>
                  <Button
                    variant="outlined"
                    size="medium"
                    className="mx-0 mx-md-1 mt-2 mt-md-0 w-100 outline-none bg-primary bg-gradient text-white"
                  >
                    View Submissions
                  </Button>
                </Link>
              </div>
              <div className="d-flex flex-column flex-md-row mx-3 mt-3">
                {submitting === true ? (
                  <>
                    <Button
                      variant="outlined"
                      size="medium"
                      className="mx-0 mx-md-1 w-100 outline-none bg-danger bg-gradient text-white"
                      disabled
                    >
                      {" "}
                      <span
                        className="spinner-border spinner-border-sm my-auto mx-auto"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      size="medium"
                      className="mx-0 mx-md-1 w-100 outline-none bg-danger bg-gradient text-white"
                      onClick={deleteAssignment}
                    >
                      Delete Assignment
                    </Button>
                  </>
                )}
              </div>
              {response && <p className="text-center">{response}</p>}
              <br />
            </>
          ) : (
            <>
              <p className="m-3">{data.message}</p>
            </>
          )}
        </>
      </Sidebar>
    </>
  );
};

export default SingleAssignment;
