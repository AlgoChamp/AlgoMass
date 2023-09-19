'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, FormEvent } from 'react';
import UserNavBar from '../components/user-navbar';

interface SignUpState {
  username: string;
  password: string;
  error: string;
}

const SignUp = () => {
  const [state, setState] = useState<SignUpState>({
    username: '',
    password: '',
    error: '',
  });
  const { username, password, error } = state;

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Your form submit logic here
  };

  const dismissError = () => setState((prev) => ({ ...prev, error: '' }));

  const inputStyle = {
    padding: '5px',
    label: { padding: '10px', display: 'inline-block', width: '100px' },
    input: {
      padding: '7px 25px',
      background: '#191919',
      outline: 'none',
      color: '#fff',
      borderRadius: '30px',
      border: 'none',
      fontSize: '14px',
    },
  };

  return (
    <>
      <Head>
        <UserNavBar />
        <title>Sign Up</title>
      </Head>
      <div>
        <Link href='/'>Go back to landing page</Link>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {['username', 'password'].map((field, idx) => (
            <div key={idx}>
              <label style={inputStyle.label}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input name={field} type={field} onChange={handleInputChange} />
            </div>
          ))}
          <div>
            <input type='submit' style={inputStyle.input} value='Sign Up' />
          </div>
          {error && (
            <div>
              <span onClick={dismissError}>
                {error},{' '}
                <a href='#' onClick={dismissError}>
                  back
                </a>
              </span>
            </div>
          )}
        </form>
        <p>
          Test Account: <code>admin</code> Password: <code>admin</code>
        </p>
      </div>
    </>
  );
};

export default SignUp;
