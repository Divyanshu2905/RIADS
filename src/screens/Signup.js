import React, { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

import '../styles/Login.css';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const userType = document.querySelector(
      'input[name="choice"]:checked'
    ).value;

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match!');
    }

    try {
      setError('');
      setLoading(true);

      let userCred = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      let user = userCred.user;
      await db.collection(userType).doc(user.uid).set({
        name: nameRef.current.value,
        email: emailRef.current.value,
      });

      navigate(`/${userType}-dashboard`);
    } catch (error) {
      setError(`Failed to create an account! ${error.message}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <section className='ftco-section'>
        <div className={`toast ${error ? 'show' : ''}`} id='toast'>
          <div class='toast-header'>
            <strong class='me-auto'>Error</strong>
            <button
              type='button'
              class='btn-close'
              data-bs-dismiss='toast'
            ></button>
          </div>
          <div className='toast-body'>
            <div>{error}</div>
          </div>
        </div>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-12 col-lg-10'>
              <div className='wrap d-md-flex'>
                <div className='text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last'>
                  <div className='text w-100'>
                    <h2>Welcome to Sign Up</h2>
                    <p>Already have an account?</p>
                    <Link
                      className='btn btn-white btn-outline-white mx-2'
                      to='/login'
                    >
                      Sign In
                    </Link>
                    <Link
                      className='btn btn-white btn-outline-white mx-2'
                      to='/'
                    >
                      Home
                    </Link>
                  </div>
                </div>
                <div className='login-wrap p-4 p-lg-5'>
                  <div className='d-flex'>
                    <div className='w-100'>
                      <h3 className='mb-4 text-dark'>Register</h3>
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    action='#'
                    className='signin-form'
                  >
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <div className='form-group mb-3'>
                      <label className='label' htmlFor='name'>
                        Username
                      </label>
                      <input
                        ref={nameRef}
                        type='text'
                        className='form-control'
                        placeholder='Username'
                        required
                      />
                    </div>
                    <div className='form-group mb-3'>
                      <label className='label' htmlFor='email'>
                        Email
                      </label>
                      <input
                        ref={emailRef}
                        type='email'
                        className='form-control'
                        placeholder='Username'
                        required
                        autoComplete='username'
                      />
                    </div>
                    <div className='form-group mb-3'>
                      <label className='label' htmlFor='password'>
                        Password
                      </label>
                      <input
                        ref={passwordRef}
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        required
                        autoComplete='new-password'
                      />
                    </div>
                    <div className='form-group mb-3'>
                      <label className='label' htmlFor='password'>
                        Confirm Password
                      </label>
                      <input
                        ref={passwordConfirmRef}
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        required
                        autoComplete='new-password'
                      />
                    </div>
                    <div className='form-group'>
                      <button
                        disabled={loading}
                        type='submit'
                        id='register'
                        className='form-control btn btn-primary submit px-3'
                      >
                        {loading ? 'Processing...' : 'Register'}
                      </button>
                    </div>
                    <div className='form-group d-md-flex mt-3'>
                      <div className='w-50 text-left'>
                        <label className='checkbox-wrap checkbox-primary mb-0'>
                          Admin
                          <input
                            type='radio'
                            name='choice'
                            defaultValue='admin'
                            defaultChecked
                          />
                          <span className='checkmark' />
                        </label>
                      </div>
                      <div className='w-50 text-left'>
                        <label className='checkbox-wrap checkbox-primary mb-0'>
                          Candidate
                          <input
                            type='radio'
                            name='choice'
                            defaultValue='candidate'
                          />
                          <span className='checkmark' />
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
