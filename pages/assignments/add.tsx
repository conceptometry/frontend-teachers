import Sidebar from "../../src/components/Sidebar";
import Head from "next/head";
import { Button } from "@material-ui/core";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
    const url = `${process.env.API_URI}/users/student`;
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
const addAssignment = ({ data }) => {
  const router = useRouter();
  useEffect(() => {
    if (!data || data === false) {
      router.push("/login");
    }
  }, []);

  let options;
  if (data) {
    options = data.message.map(getOptions);
  }

  function getOptions(item) {
    var options = { value: item._id, label: item.name };
    return options;
  }

  const [selectedValue, setSelectedValue] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const formData = {
    name,
    description,
    dueDate,
    student: selectedValue,
  };

  useEffect(() => {
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState("");
  const [cookies] = useCookies(["token"]);
  const submitForm = async (e) => {
    e.preventDefault();
    if (selectedValue.length === 0) {
      setResponse("Please enter a valid value for the students");
    } else {
      setSubmitting(true);
      const url = `${process.env.NEXT_PUBLIC_API_URI}/assignments`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(formData),
      };
      try {
        const res = await fetch(url, options);

        const resJson = await res.json();
        if (resJson.success === true) {
          setResponse(resJson.message);
          setSelectedValue([]);
          setName(" ");
          setDueDate("0");
          setDescription(" ");
          setSubmitting(false);
          router.push("/assignments");
        } else {
          console.log(resJson.message);
          const message = `${resJson.message}`;
          setResponse(message);
          setSubmitting(false);
        }
      } catch (e) {
        console.log(e);
        const message = `An error has occured: 50X`;
        setResponse(message);
        setSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  return (
    <>
      <Head>
        <title>Conceptometry | Add Assignment</title>
      </Head>
      <Sidebar>
        <h2 className="text-center mt-2">Add Assignment</h2>
        <>
          {data.success === true ? (
            <>
              {data.count === 0 ? (
                <>
                  <p className="m-3">
                    You need to have atleast one student to make an assignment
                  </p>
                </>
              ) : (
                <>
                  <div className="d-flex mx-3 flex-column">
                    <form
                      className="mx-auto w-100 d-flex flex-column needs-validation"
                      onSubmit={submitForm}
                      noValidate={true}
                    >
                      <Select
                        // value={options.filter((obj) =>
                        // 	selectedValue.includes(obj.value)
                        // )}
                        options={options}
                        isMulti
                        onChange={handleChange}
                        required
                      />

                      <div className="my-3 form-floating">
                        <input
                          type="number"
                          name="dueDate"
                          id="dueDateField"
                          placeholder="Time for Assignment (in days)"
                          className="form-control w-100"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          required
                        />
                        <label htmlFor="dueDateField">
                          Time for Assignment (in days)
                        </label>
                        <div className="invalid-feedback">
                          Please provide a valid assignment time
                        </div>
                      </div>
                      <div className="my-3 form-floating">
                        <input
                          type="text"
                          name="name"
                          id="nameField"
                          placeholder="Assignment Name"
                          className="form-control w-100"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <label htmlFor="nameField">Assingment Name</label>
                        <div className="invalid-feedback">
                          Please provide a valid assignment name
                        </div>
                      </div>
                      <div className="my-3 form-floating">
                        <textarea
                          id="descriptionField"
                          placeholder="Assignment Description"
                          name="description"
                          className="form-control w-100"
                          rows={5}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                        <label htmlFor="descriptionField">
                          Assingment Description
                        </label>
                        <div className="invalid-feedback">
                          Please provide a valid assignment description
                        </div>
                      </div>
                      {submitting === true ? (
                        <>
                          <Button
                            disabled={true}
                            className="btn btn-light border border-primary bg-gradient btn-block outline-none"
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
                            className="btn btn-light border border-primary bg-gradient btn-block outline-none"
                          >
                            Submit
                          </Button>
                        </>
                      )}
                      {response && (
                        <p className="mt-1 text-center">{response}</p>
                      )}
                    </form>
                  </div>
                </>
              )}
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

export default addAssignment;
