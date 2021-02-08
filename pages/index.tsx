import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HomeButtons from "../src/components/Home/Buttons";
import HomeInfoTabs from "../src/components/Home/InfoTabs";
import Sidebar from "../src/components/Sidebar";

export const getServerSideProps = async (ctx) => {
  const isLoggedIn = ctx.req.headers.cookie;
  if (
    isLoggedIn === "token=null" ||
    isLoggedIn === "token=undefined" ||
    !isLoggedIn
  ) {
    return {
      props: { assignmentData: false, lectureData: false, studentData: false },
    };
  } else {
    const token = ctx.req.headers.cookie.split("=")[1];
    // Fetch Assignments
    const assignmentRes = await fetch(
      `${process.env.API_URI}/assignments?page=1&limit=4`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
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

    // Fetch Lectures
    const lectureRes = await fetch(
      `${
        process.env.API_URI
      }/lectures?page=1&limit=4&day=${new Date().getDay()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    let lectureData;
    if (!lectureRes.ok) {
      const message = `An error has occured: ${lectureRes.status}`;
      lectureData = {
        success: false,
        message: message,
        status: lectureRes.status,
      };
    } else {
      lectureData = await lectureRes.json();
    }

    // Fetch Students
    const studentRes = await fetch(
      `${process.env.API_URI}/users/student?page=1&limit=4&sort=-createdAt`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    let studentData;
    if (!studentRes.ok) {
      const message = `An error has occured: ${studentRes.status}`;
      studentData = {
        success: false,
        message: message,
        status: studentRes.status,
      };
    } else {
      studentData = await studentRes.json();
    }

    // Return data as props
    return {
      props: {
        assignmentData,
        lectureData,
        studentData,
      },
    };
  }
};

interface Props {
  assignmentData?: any;
  lectureData?: any;
  studentData?: any;
}

export default function Home({
  assignmentData,
  lectureData,
  studentData,
}: Props) {
  const router = useRouter();
  useEffect(() => {
    if (
      assignmentData === false ||
      lectureData === false ||
      assignmentData === false
    ) {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Conceptometry | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar>
        {assignmentData.success === true ||
        lectureData.success === true ||
        studentData.success === true ? (
          <>
            <HomeInfoTabs
              lectureData={lectureData}
              assignmentData={assignmentData}
              studentData={studentData}
            />
            <HomeButtons />
          </>
        ) : (
          <>
            <div className="m-3">
              <p>{assignmentData.message}</p>
            </div>
          </>
        )}
      </Sidebar>
    </div>
  );
}
