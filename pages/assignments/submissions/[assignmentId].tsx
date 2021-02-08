import { List } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SubmissionList from "../../../src/components/lists/SubmissionList";
import Sidebar from "../../../src/components/Sidebar";

export const getServerSideProps = async (ctx) => {
  const assignmentId = ctx.query.assignmentId;
  const isLoggedIn = ctx.req.headers.cookie;
  if (
    isLoggedIn === "token=null" ||
    isLoggedIn === "token=undefined" ||
    !isLoggedIn
  ) {
    return { props: { data: false, assignmentData: false } };
  } else {
    const token = ctx.req.headers.cookie.split("=")[1];
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(
      `${process.env.API_URI}/submissions/get/${assignmentId}`,
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

    const assignmentRes = await fetch(
      `${process.env.API_URI}/assignments/${assignmentId}?select=name`,
      options
    );
    let assignmentData;
    if (!assignmentRes.ok) {
      const message = `An error has occured: ${assignmentRes.status}`;
      assignmentData = {
        success: false,
        message: message,
        status: assignmentRes.status,
      };
    } else {
      assignmentData = await assignmentRes.json();
    }

    return { props: { data, assignmentData } };
  }
};

const ViewSubmissionsByAssignment = ({ data, assignmentData }) => {
  const router = useRouter();
  useEffect(() => {
    if (data === false || assignmentData === false) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Conceptometry | Assignment Submissions</title>
      </Head>
      <Sidebar>
        <h2 className="mx-4 mt-3">{assignmentData.message.name}</h2>
        <p className="mx-4" style={{ marginTop: "-12px" }}>
          Submissions
        </p>
        {data.count === 0 ? (
          <>
            <p className="mx-4">Nobody has submitted the assignment...</p>
          </>
        ) : (
          <>
            <List dense={false} className="d-flex flex-column mx-4">
              {data.message.map((d) => (
                <SubmissionList
                  key={d._id}
                  id={d._id}
                  name={d.user.name}
                  style={false}
                />
              ))}
            </List>
          </>
        )}
      </Sidebar>
    </>
  );
};

export default ViewSubmissionsByAssignment;
