import Sidebar from "../../src/components/Sidebar";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import AssignmentList from "../../src/components/lists/AssignmentList";
import { IconButton, List } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { useEffect } from "react";

export const getServerSideProps = async (ctx) => {
  const page = ctx.query.page;
  const isLoggedIn = ctx.req.headers.cookie;
  if (
    isLoggedIn === "token=null" ||
    isLoggedIn === "token=undefined" ||
    !isLoggedIn
  ) {
    return { props: { data: false } };
  } else {
    const token = ctx.req.headers.cookie.split("=")[1];
    const url = `${process.env.API_URI}/assignments?page=${page || 1}&limit=6`;
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

const Assignments = ({ data }) => {
  const router = useRouter();
  useEffect(() => {
    if (!data || data === false) {
      router.push("/login");
    }
  }, []);
  const { page } = router.query;
  return (
    <>
      <Head>
        <title>Conceptometry | Assignments</title>
      </Head>
      <Sidebar>
        {data.success === true ? (
          <>
            <Link href="/assignments/add">
              <div
                className="addAssignment position-fixed"
                style={{ top: 72, right: 10 }}
              >
                <IconButton
                  className="outline-none"
                  style={{ border: "1px solid #111" }}
                >
                  <AddRounded className="outline-none" />
                </IconButton>
              </div>
            </Link>
            <h2 className="text-center my-2">Assignments</h2>
            <List>
              {data.message.map((a) => (
                <AssignmentList
                  key={a._id}
                  id={a._id}
                  dueDate={a.dueDate}
                  name={a.name}
                  style={false}
                />
              ))}
            </List>
            <div className="d-flex mx-1">
              {+page > 1 && (
                <Link href={`/assignments?page=${(+page || 1) - 1}`}>
                  <a
                    className="btn btn-light border border-1 border-primary bg-gradient mx-1"
                    style={{ width: "100%" }}
                  >
                    Previous Page
                  </a>
                </Link>
              )}
              {data.pages > (page || 1) && (
                <Link href={`/assignments?page=${(+page || 1) + 1}`}>
                  <a
                    className="btn btn-light border border-1 border-primary bg-gradient mx-1"
                    style={{ width: "100%" }}
                  >
                    Next Page
                  </a>
                </Link>
              )}
            </div>
            <div className="d-flex mx-1 mt-1">
              <button
                type="button"
                className="btn btn-light bg-gradient border border-primary mx-1 w-100 shadow-sm"
              >
                Total Pages{" "}
                <span
                  className="badge bg-secondary"
                  style={{ fontWeight: 500 }}
                >
                  {data.pages || 0}
                </span>
              </button>
              <button
                type="button"
                className="btn btn-light bg-gradient border border-primary mx-1 w-100 shadow-sm"
              >
                Current Page{" "}
                <span
                  className="badge bg-secondary"
                  style={{ fontWeight: 500 }}
                >
                  {page || 1}
                </span>
              </button>
            </div>
          </>
        ) : (
          <p className="m-3">{data.message}</p>
        )}
      </Sidebar>
    </>
  );
};

export default Assignments;
