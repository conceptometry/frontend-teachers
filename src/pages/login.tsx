import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/StateProvider';

import { useCookies } from 'react-cookie';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['token']);
  useEffect(() => {
    if (cookies.token) {
      router.push('/');
    }
  }, [cookies.token]);

  const [{ token }, dispatch]: any = useStateValue();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formData = {
    email,
    password,
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
    const url = `${process.env.NEXT_PUBLIC_API_URI}/auth/login`;
    const options: {
      method: string;
      headers: { 'Content-Type': string };
      body: any;
    } = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    try {
      const res = await fetch(url, options);

      const resJson = await res.json();
      if (resJson.success === true && resJson.user.role === 'teacher') {
        dispatch({
          type: 'SET_USER',
          user: resJson.user,
          token: resJson.token,
        });
        setResponse(`Logged In!`);
        setSubmitting(false);
        setCookie('token', `${resJson.token}`, {
          path: '/',
          secure: true,
          maxAge: 3600 * 24 * 30,
          sameSite: true,
        });
        localStorage.setItem('user', JSON.stringify(resJson.user));
        router.push('/');
      } else if (resJson.success === false) {
        const message = `${resJson.message}`;
        setResponse(message);
        setSubmitting(false);
      } else if (resJson.user.role !== 'teacher') {
        const message = `Only teachers can access the dashboard`;
        setResponse(message);
        setSubmitting(false);
      } else {
        const message = `${resJson.message}`;
        setResponse(message);
        setSubmitting(false);
      }
    } catch (e) {
      const message = `An error has occured: 50X`;
      setResponse(message);
      setSubmitting(false);
    }
  };
  return (
    <>
      <Head>
        <title>Conceptometry | Login</title>
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
        <h2 className='text-center'>Login</h2>
        <form
          className='mt-4 needs-validation'
          noValidate={true}
          onSubmit={handleSubmit}
        >
          <div className='my-3 form-floating'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              className='form-control w-100'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor='nameField'>Email</label>
            <div className='invalid-feedback'>Please provide a valid email</div>
          </div>
          <div className='my-3 form-floating'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              className='form-control w-100'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor='nameField'>Password</label>
            <div className='invalid-feedback'>
              Please provide a valid password
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
        <Link href='/forgot-password'>
          <a className='mt-1'>
            <p className='text-center'>Forgot your password? Click here</p>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Login;
