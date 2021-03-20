import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Sidebar from '../../components/Sidebar';

const Profile = () => {
  const router = useRouter();
  const [cookies] = useCookies(['token']);
  useEffect(() => {
    if (!cookies.token || cookies.token === null) {
      router.push('/login');
    }
  }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('user'))
    ) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      }
    }
  }, []);

  // Update password
  const [updatePasswordResponse, setUpdatePasswordResponse] = useState('');
  const [updatePasswordSubmitting, setUpdatePasswordSubmitting] = useState(
    false
  );

  const updatePasswordFormData = {
    currentPassword: oldPassword,
    newPassword: newPassword,
  };

  const submitUpdatePasswordForm = async (e) => {
    e.preventDefault();

    setUpdatePasswordSubmitting(true);
    const url = `${process.env.NEXT_PUBLIC_API_URI}/users/me/password`;
    const options: {
      method: string;
      headers: { 'Content-Type': string; authorization: string };
      body: any;
    } = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify(updatePasswordFormData),
    };
    try {
      const res = await fetch(url, options);

      const resJson = await res.json();
      if (resJson.success === true) {
        if (resJson.message === true) {
          setUpdatePasswordResponse('Your password has been updated');
        }
        setUpdatePasswordSubmitting(false);
      } else {
        const message = `${resJson.message}`;
        setUpdatePasswordResponse(message);
        setUpdatePasswordSubmitting(false);
      }
    } catch (e) {
      const message = `An error has occured: 50X`;
      setUpdatePasswordResponse(message);
      setUpdatePasswordSubmitting(false);
    }
  };
  return (
    <>
      <Head>
        <title>Conceptometry | Profile</title>
      </Head>
      <Sidebar>
        <div className='container'>
          <div className='d-flex'>
            {typeof window !== 'undefined' &&
              JSON.parse(localStorage.getItem('user')) && (
                <>
                  <p style={{ fontSize: 36 }} className='mt-4 mx-auto'>
                    Hey, {JSON.parse(localStorage.getItem('user')).name}
                  </p>
                </>
              )}
          </div>
        </div>
        <div className='container'>
          <form className='form-control needs-validation' noValidate>
            <p style={{ fontSize: 22 }} className='mx-auto text-center mt-2'>
              User Information
            </p>
            <div className='my-3 form-floating'>
              <input
                type='text'
                name='name'
                id='nameField'
                placeholder='Name'
                className='form-control w-100'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor='nameField'>Name</label>
              <div className='invalid-feedback'>
                Please provide a valid name
              </div>
            </div>
            <div className='my-3 form-floating'>
              <input
                type='number'
                name='phone'
                id='phoneField'
                placeholder='Phone Number'
                className='form-control w-100'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                minLength={10}
                maxLength={10}
              />
              <label htmlFor='phoneField'>Phone Number</label>
              <div className='invalid-feedback'>
                Please provide a valid phone number
              </div>
            </div>
            <div className='my-3 form-floating'>
              <input
                type='email'
                name='email'
                id='emailField'
                placeholder='Email'
                className='form-control w-100'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor='emailField'>Email</label>
              <div className='invalid-feedback'>
                Please provide a valid email
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary bg-gradient w-100 mb-2'
            >
              Save
            </button>
          </form>
          <form
            className='form-control needs-validation mt-3'
            noValidate
            onSubmit={submitUpdatePasswordForm}
          >
            <p style={{ fontSize: 22 }} className='mx-auto text-center mt-2'>
              Update Password
            </p>
            <div className='my-3 form-floating'>
              <input
                type='password'
                name='oldPassword'
                id='oldPassword'
                placeholder='Old Password'
                className='form-control w-100'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <label htmlFor='oldPassword'>Old Password</label>
              <div className='invalid-feedback'>
                Please provide a valid password
              </div>
            </div>
            <div className='my-3 form-floating'>
              <input
                type='password'
                name='newPassword'
                id='newPassword'
                placeholder='New Password'
                className='form-control w-100'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <label htmlFor='newPassword'>New Password</label>
              <div className='invalid-feedback'>
                Please provide a valid password
              </div>
            </div>
            {updatePasswordSubmitting === true ? (
              <button
                type='submit'
                className='btn btn-primary bg-gradient w-100 mb-2'
              >
                <span
                  className='spinner-border spinner-border-sm my-auto mx-auto'
                  role='status'
                  aria-hidden='true'
                ></span>
              </button>
            ) : (
              <button
                type='submit'
                className='btn btn-primary bg-gradient w-100 mb-2'
              >
                Update
              </button>
            )}
            {updatePasswordResponse && (
              <>
                <p className='mt-1 text-center'>{updatePasswordResponse}</p>
              </>
            )}
          </form>
        </div>
      </Sidebar>
    </>
  );
};

export default Profile;
