'use client';
import { useRouter } from 'next/navigation';
import HomeNavBar from '../components/home-navbar';
import Head from 'next/head';
import Link from 'next/link';
import { useState, FormEvent } from 'react';

interface SignInState {
  username: string;
  password: string;
  error: string;
}

const SignIn = () => {
  const [state, setState] = useState<SignInState>({
    username: '',
    password: '',
    error: '',
  });
  const { username, password, error } = state;
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
		console.log('handlesubmit function', username, password)
    if (username === 'admin' && password === 'admin') {
      // Redirect to the "lobby"
      console.log('this is a truthy login but useRouter err');
      router.push('/default-room');
    } else {
      setState((prev) => ({ ...prev, error: 'Invalid credentials' }));
    }
  };
  //
  const dismissError = () => {
    null; // or some setError('') with useState?
  };
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <HomeNavBar />
      <div className='h-screen bg-bgblack flex flex-col justify-center items-center'>
        <form
          className='w-full max-w-md p-8 border border-red-500 rounded'
          onSubmit={handleSubmit}
        >
          <div className='bg-gray-800 p-6 mb-4'>
            <label className=' text-softred block red_text_nav text-sm mb-2'>
              Username
            </label>
            <input
              className='shadow border rounded w-full py-2 px-3 text-gray-400 leading-tight'
              name='username'
              type='text'
              placeholder='Enter username'
              onChange={handleInputChange}
            />
          </div>
          <div className='bg-gray-800 p-6 mb-6'>
            <label className=' text-softred block red_text_nav text-sm mb-2'>
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight'
              name='password'
              type='password'
              placeholder='Enter password'
              onChange={handleInputChange}
            />
          </div>
          <div className='bg-gray-800 p-6'>
            <button
              type='submit'
              className='border border-red-500 hover:bg-softred hover:text-bgblack py-1 px-4 ml-4 rounded'
            >
              Sign In
            </button>
          </div>
          {error && (
            <div className='mt-4 text-red-600 bg-gray-800 p-6'>
              <span onClick={dismissError}>
                {error},{' '}
                <a
                  href='#'
                  onClick={dismissError}
                  className='text-red-500 hover:underline'
                >
                  back
                </a>
              </span>
            </div>
          )}
          <Link href='/sign-up'>Don't have an account?</Link>
        </form>
      </div>
    </>
  );
};
//potential name switch:AlgoMasters, AlgoMelee, AlgoWars
export default SignIn;
