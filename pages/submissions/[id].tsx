import {
  Button,
  FormControl,
  Modal,
  Backdrop,
  Fade,
  TextField,
} from "@material-ui/core";
import Head from "next/head";
import { useEffect, useState } from "react";
import InfoBlock from "../../src/components/blocks/InfoBlock";
import Sidebar from "../../src/components/Sidebar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

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
    const url = `${process.env.API_URI}/submissions/${id}`;
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

const SingleSubmission = ({ data }) => {
  const router = useRouter();
  useEffect(() => {
    if (!data || data === false) {
      router.push("/login");
    }
  }, []);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [remarks, setRemarks] = useState<string>("");
  const [marks, setMarks] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    if (data.message[0].marks) {
      setMarks(data.message[0].marks);
      setRemarks(data.message[0].remarks);
    } else {
      setMarks("");
      setRemarks("");
    }
  }, [data]);

  const { id } = router.query;
  const [submitting, setSubmitting] = useState(false);
  const { handleSubmit, errors, register } = useForm();
  const [cookies] = useCookies(["token"]);
  const markAssignment = async (data) => {
    setSubmitting(true);
    console.log(JSON.stringify(data));
    const url = `${process.env.NEXT_PUBLIC_API_URI}/submissions/${id}/mark`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        const message = `An error has occured: ${res.status}`;
        setResponse(message);
        setSubmitting(false);
        console.log(res);
      } else {
        const resJson = await res.json();
        console.log(resJson);
        if (resJson.success === true) {
          setResponse(resJson.message);
          setSubmitting(false);
        } else {
          const message = `An error has occured: 40X`;
          setResponse(message);
          setSubmitting(false);
        }
      }
    } catch (e) {
      console.log(e);
      const message = `An error has occured: 50X`;
      setResponse(message);
      setSubmitting(false);
    }
  };

  const submittedOn = new Date(data.message[0].submissionDate);
  const formattedSubmittedOn =
    submittedOn.getDate() +
    "/" +
    (submittedOn.getMonth() + 1) +
    "/" +
    submittedOn.getFullYear();
  return (
    <>
      <Head>
        <title>Conceptometry | Submission</title>
      </Head>
      <Sidebar>
        {data.success === true ? (
          <>
            <div className="d-sm-flex justify-content-between mx-3 pt-3 my-auto">
              <h4 className="my-auto">{data.message[0].assignment.name}</h4>

              <p className="my-auto">
                By{" "}
                <span className="text-capitalize">
                  {data.message[0].user.name}
                </span>
              </p>
            </div>
            <hr />
            <div className="d-flex mx-3 justify-content-between my-auto">
              <h6>{formattedSubmittedOn}</h6>
              {data.message[0].late === true && (
                <h6>
                  <span className="badge rounded-pill bg-danger bg-gradient px-3 ">
                    Late
                  </span>
                </h6>
              )}
            </div>
            <hr />
            <div className="d-flex flex-column mx-3">
              <h4>Comments</h4>
              <p>{data.message[0].submissionText}</p>
            </div>
            <div className="d-flex mx-3">
              <div
                className="w-100 border border-primary border-2 bg-infoblock p-3 m-auto mx-2 d-flex flex-column mt-lg-0 mt-3"
                style={{ borderRadius: 12, minHeight: 190 }}
              >
                <p className="mx-auto mt-3" style={{ fontSize: 18 }}>
                  File
                </p>
                {data.message[0].submissionMaterials === "nofile" ? (
                  <>
                    <p
                      className="m-auto text-center"
                      style={{ fontSize: 26, fontWeight: 500 }}
                    >
                      No file has been uploaded
                    </p>
                  </>
                ) : (
                  <>
                    <a
                      href={data.message[0].submissionMaterials}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="m-auto text-center"
                      style={{ fontSize: 26, fontWeight: 500 }}
                    >
                      Click Here
                    </a>
                  </>
                )}
              </div>
            </div>
            <div className="d-lg-flex mx-3 my-3">
              <InfoBlock name={"Remarks"} info={data.message[0].remarks} />
              {data.message[0].marks && (
                <InfoBlock
                  name={"Marks"}
                  info={`${JSON.stringify(data.message[0].marks)}/10`}
                />
              )}
            </div>

            <div className="d-flex mb-3 mx-4 shadow">
              <Button
                onClick={handleOpen}
                variant="outlined"
                size="medium"
                className="outline-none w-100 d-flex mx-auto btn btn-light border border-primary border-2"
              >
                {!data.message[0].marks ? `Mark Submission` : `Edit Grades`}
              </Button>
            </div>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div
                  className={`${classes.paper} d-flex flex-column outline-none`}
                >
                  <h3
                    id="transition-modal-title"
                    className="text-center mx-auto"
                  >
                    Mark Submission
                  </h3>
                  <div className="d-flex flex-column mt-2">
                    <form
                      onSubmit={handleSubmit(markAssignment)}
                      className="d-flex flex-column w-100"
                    >
                      <FormControl className={"w-100"}>
                        <TextField
                          className="mt-1 mb-2"
                          type="number"
                          label="Marks"
                          name="marks"
                          size="small"
                          value={marks}
                          inputRef={register({
                            required: "Please fill the marks",
                            max: {
                              value: 10,
                              message: "Maximum marks can be 10",
                            },
                            min: {
                              value: 1,
                              message: "Minimum marks have be 1",
                            },
                          })}
                          onChange={(e) => setMarks(e.target.value)}
                        />
                        {errors.marks && (
                          <p className="my-1">{errors.marks.message}</p>
                        )}
                      </FormControl>

                      <FormControl>
                        <TextField
                          className="mt-1 mb-2"
                          type="text"
                          label="Remarks"
                          name="remarks"
                          size="small"
                          inputRef={register({
                            required: "Please give a feedback to the student",
                          })}
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                        />
                        {errors.remarks && (
                          <p className="my-1">{errors.remarks.message}</p>
                        )}
                      </FormControl>

                      <FormControl>
                        {submitting === true ? (
                          <>
                            <Button
                              variant="outlined"
                              size="medium"
                              className="outline-none w-100 d-flex mx-auto btn btn-light border border-primary border-2"
                              disabled
                            >
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
                              type="submit"
                              variant="outlined"
                              size="medium"
                              className="outline-none w-100 d-flex mx-auto btn btn-light border border-primary border-2"
                            >
                              Submit
                            </Button>
                          </>
                        )}
                      </FormControl>
                      <p>{response}</p>
                    </form>
                  </div>
                </div>
              </Fade>
            </Modal>
          </>
        ) : (
          <>
            <p>{data.message}</p>
          </>
        )}
      </Sidebar>
    </>
  );
};

export default SingleSubmission;
