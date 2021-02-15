import Head from 'next/head';
import { useEffect, useState } from 'react';
import Sidebar from '../../src/components/Sidebar';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const addStudent = () => {
  const router = useRouter();
  const [cookies] = useCookies(['token']);
  useEffect(() => {
    if (!cookies.token || cookies.token === null) {
      router.push('/login');
    }
  }, []);
  useEffect(() => {
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });
  }, []);

  const [email, setEmail] = useState('');

  const formData = {
    email: email,
  };
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState('');
  const submitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const url = `${process.env.NEXT_PUBLIC_API_URI}/auth/initiateuser`;
    const options = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${cookies.token}`,
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
        <title>Conceptometry | Add Student</title>
      </Head>
      <Sidebar>
        <div className='container m-0 p-0'>
          <div className='d-flex justify-content-between mx-3 my-auto py-3'>
            <h3 className='my-auto mx-auto'>Add Student</h3>
          </div>

          <form
            className='mx-3 needs-validation'
            onSubmit={submitForm}
            noValidate
          >
            <div className='my-3 form-floating'>
              <input
                type='email'
                name='email'
                placeholder='Student Email'
                className='form-control w-100'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor='nameField'>Student Email</label>
              <div className='invalid-feedback'>
                Please provide a valid email
              </div>
            </div>
            {submitting === true ? (
              <>
                <button
                  disabled
                  className='btn btn-primary btn-block bg-gradient col-12'
                >
                  <span
                    className='spinner-border spinner-border-sm my-auto mx-auto'
                    role='status'
                    aria-hidden='true'
                  ></span>
                </button>
              </>
            ) : (
              <>
                {' '}
                <button
                  type='submit'
                  className='btn btn-primary btn-block bg-gradient col-12'
                >
                  Submit
                </button>
              </>
            )}
          </form>
          {response && <p className='mx-2 my-1 text-center'>{response}</p>}
        </div>
      </Sidebar>
    </>
  );
};

export default addStudent;
