import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../../src/components/Sidebar";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2NiZTVlZTliZTRiMWNiNDk0ZWU2MyIsImlhdCI6MTYxMTAzMDg3NCwiZXhwIjoxNjEzNjIyODc0fQ.cWJgfAc6aYFOB5_W1DOSPvvXVmdcXzNe8aFEz91aPU0";

export const getServerSideProps = async ({ query }) => {
  const id = query.id;
  const url = `${process.env.API_URI}/users/${id}`;
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
};

interface Props {
  data: any;
}
const singleStudent = ({ data }: Props) => {
  console.log(data);
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [feePayed, setFeePayed] = useState("false");
  const [isActive, setIsActive] = useState("true");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    setName(data.message.name);
    setEmail(data.message.email);
    setParentName(data.message.parentsName);
    setParentEmail(data.message.parentsEmail);
    setGrade(data.message.grade);
    setFeePayed(data.message.feePayed);
    setPhone(data.message.phone);
    setIsActive(data.message.isActive);
  }, []);

  const router = useRouter();
  const id = router.query.id;
  const formData = {
    name,
    email,
    grade,
    feePayed,
    phone,
    isActive,
    parentsEmail: parentEmail,
    parentsName: parentName,
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const url = `${process.env.NEXT_PUBLIC_API_URI}/users/${id}`;
    const options = {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await fetch(url, options);

      const resJson = await res.json();
      if (resJson.success === true) {
        setResponse(resJson.message);
        setSubmitting(false);
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
  };

  return (
    <>
      <Head>
        <title>Conceptometry | {data.message.name}</title>
      </Head>
      <Sidebar>
        <div className="container m-0 p-0">
          <div className="mx-3 py-2 my-auto d-flex justify-content-between">
            <h3 className="text-capitalize my-auto">{name}</h3>
            <p className="text-capitalize my-auto">Grade - {grade}</p>
          </div>
          <hr className="m-0 p-0" />

          {data.message.profilePhoto !== "no-photo.jpg" && (
            <>
              <img
                src={data.message.profilePhoto}
                alt={data.message.name}
                className="my-3 mx-auto"
              />
            </>
          )}

          <form
            className="mx-3 py-2 needs-validation"
            noValidate
            onSubmit={submitForm}
          >
            <div className="my-3 form-floating">
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                className="form-control w-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="nameField">Student Name</label>
              <div className="invalid-feedback">Please provide a name</div>
            </div>
            <div className="my-3 form-floating">
              <input
                type="email"
                name="email"
                placeholder="Student Email"
                className="form-control w-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="nameField">Student Email</label>
              <div className="invalid-feedback">
                Please provide a valid email
              </div>
            </div>
            <div className="my-3 form-floating">
              <input
                type="text"
                name="name"
                placeholder="Parent Name"
                className="form-control w-100"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                required
              />
              <label htmlFor="nameField">Parent Name</label>
              <div className="invalid-feedback">Please provide a name</div>
            </div>
            <div className="my-3 form-floating">
              <input
                type="email"
                name="paremtEmail"
                placeholder="Parent's Email"
                className="form-control w-100"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                required
              />
              <label htmlFor="nameField">Parent's Email</label>
              <div className="invalid-feedback">
                Please provide a valid email
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                  >
                    <option selected>Grade</option>
                    <option value={"Nursery"}>Nursery</option>
                    <option value={"KG"}>Kinder Garden</option>
                    <option value={"1"}>Class 1</option>
                    <option value={"2"}>Class 2</option>
                    <option value={"3"}>Class 3</option>
                    <option value={"4"}>Class 4</option>
                    <option value={"5"}>Class 5</option>
                    <option value={"6"}>Class 6</option>
                    <option value={"7"}>Class 7</option>
                    <option value={"8"}>Class 8</option>
                    <option value={"9"}>Class 9</option>
                    <option value={"10"}>Class 10</option>
                  </select>
                  <label htmlFor="floatingSelect">Grade</label>
                  <div className="invalid-feedback">Please select a value</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="number"
                    name="phone"
                    placeholder="Parent's Phone"
                    className="form-control w-100"
                    minLength={10}
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <label htmlFor="nameField">Parent's Phone</label>
                  <div className="invalid-feedback">
                    Please provide a valid phone number
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    value={isActive}
                    onChange={(e) => setIsActive(e.target.value)}
                    required
                  >
                    <option selected>Is Active</option>
                    <option value={"true"}>Yes</option>
                    <option value={"false"}>No</option>
                  </select>
                  <label htmlFor="floatingSelect">Is Active</label>
                  <div className="invalid-feedback">Please select a value</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    value={feePayed}
                    onChange={(e) => setFeePayed(e.target.value)}
                    required
                  >
                    <option selected>Is Active</option>
                    <option value={"true"}>Yes</option>
                    <option value={"false"}>No</option>
                  </select>
                  <label htmlFor="floatingSelect">Fee Payed</label>
                  <div className="invalid-feedback">Please select a value</div>
                </div>
              </div>
            </div>
            {submitting === true ? (
              <>
                <button
                  disabled
                  className="btn w-100 btn-block btn-primary bg-gradient"
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
                  type="submit"
                  className="btn w-100 btn-block btn-primary bg-gradient"
                >
                  Submit
                </button>
              </>
            )}
          </form>
          {response && <p className="mx-auto py-1 text-center">{response}</p>}
        </div>
      </Sidebar>
    </>
  );
};

export default singleStudent;
