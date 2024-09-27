import React, { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/Login.css';

import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      navigate('/login');
    } catch {
      setError('Wrong email or password');
    }
    setLoading(false);
  }

  return (
    <section className='ftco-section'>
      <div className='toast' id='toast'>
        <div className='toast-body'>
          <div>Invalid username or password</div>
        </div>
        <div className='progress'>
          <div
            className='progress-bar progress-bar-striped progress-bar-animated'
            role='progressbar'
            aria-valuenow={75}
            aria-valuemin={0}
            style={{ width: '0%' }}
            aria-valuemax={100}
          />
        </div>
      </div>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-12 col-lg-10'>
            <div className='wrap d-md-flex'>
              <div className='text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last'>
                <div className='text w-100'>
                  <h2>Forget Password</h2>
                  <p>Know your password?</p>
                  <Link
                    className='btn btn-white btn-outline-white mx-2'
                    to='/login'
                  >
                    Log In
                  </Link>
                  <Link className='btn btn-white btn-outline-white mx-2' to='/'>
                    Home
                  </Link>
                </div>
              </div>
              <div className='login-wrap p-4 p-lg-5'>
                <div className='d-flex'>
                  <div className='w-100'>
                    <h3 className='mb-4'>Forget Password</h3>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className='signin-form'>
                  {error && <Alert variant='danger'>{error}</Alert>}
                  <div className='form-group mb-3'>
                    <label className='label' htmlFor='name'>
                      Email
                    </label>
                    <input
                      ref={emailRef}
                      type='email'
                      className='form-control'
                      placeholder='Email'
                      required
                    />
                  </div>
                  <div className='form-group' id='submit'>
                    <button
                      disabled={loading}
                      type='submit'
                      className='form-control btn btn-primary submit px-3'
                    >
                      Send Email
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
