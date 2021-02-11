import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';
import { setTimeout } from 'timers';

const ResetPassword = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['token']);
  useEffect(() => {
    if (cookies.token) {
      router.push('/');
    }
  }, [cookies.token]);

  const { token } = router.query;

  const [password, setPassword] = useState('');
  const formData = {
    password: password,
  };

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

  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const url = `${process.env.NEXT_PUBLIC_API_URI}/auth/resetpassword/${token}`;
    console.log(url);
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    try {
      const res = await fetch(url, options);
      const resJson = await res.json();
      if (resJson.success === true) {
        console.log(resJson);
        setResponse(
          `${
            resJson.message === true
              ? `Your password has successfully been reset`
              : resJson.message
          }`
        );

        setCookie('token', `${resJson.token}`, {
          path: '/',
        });
        localStorage.setItem('user', JSON.stringify(resJson.user));

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
        <title>Conceptometry | Reset Password</title>
      </Head>
      <div className='container'>
        <img
          src='/images/logo.webp'
          alt='Conceptometry Logo'
          className='mx-auto d-flex'
          style={{
            maxWidth: 300,
          }}
        />
        <h2 className='text-center'>Reset Password</h2>
        <form
          className='mt-4 needs-validation'
          noValidate={true}
          onSubmit={handleSubmit}
        >
          <div className='my-3 form-floating'>
            <input
              type='password'
              name='passsword'
              placeholder='Password'
              className='form-control w-100'
              value={password}
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor='nameField'>Password</label>
            <div className='invalid-feedback'>
              Please provide a valid password (minimum length 6)
            </div>
          </div>
          {submitting === true ? (
            <>
              <button
                disabled
                className='btn btn-primary btn-block bg-gradient w-100'
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
              <button
                type='submit'
                className='btn btn-primary btn-block bg-gradient w-100'
              >
                Submit
              </button>
            </>
          )}
        </form>
        {response ? (
          <>
            <p className='text-center mt-1'>{response}</p>
          </>
        ) : (
          <>
            <p className='text-center mt-1'>{response}</p>
          </>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
