'use client';
import HomeNavBar from '../components/home-navbar';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { useState, FormEvent } from 'react';

interface SignUpState {
	email: string;
	password: string;
	confirmPassword: string;
	error: string;
}

const SignUp = () => {
	const [state, setState] = useState<SignUpState>({
		email: '',
		password: '',
		confirmPassword: '',
		error: '',
	});

	const { email, password, confirmPassword, error } = state;
	const router = useRouter();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setState((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		//some logic
		try {
			if (!email || !password || password !== confirmPassword) {
				console.log('user input was incorrect');
				setState((prev) => ({ ...prev, error: 'Validation failed' }));
				return;
			}
			//prepare data and api call
			const formData = { email, password };
			if (formData) {
				console.log('acting as server');
				router.push('/default-room');
				return;
			} else {
				console.log('else block in sign up', formData);
				return null;
			}
		} catch {
			console.log('catch block reached');
		}
	};
	//might not need this do to href approach
	// const handleGitHubSignIn = async (e: React.MouseEvent) => {
	// 	e.preventDefault();
	// 	console.log('attempting github signin');
	// 	window.location.href = '/api/auth/signin/github';
	// };
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <HomeNavBar />
      <div className='h-screen bg-bgblack flex flex-col justify-center items-center'>
        <form
          className='w-full max-w-md p-8 border border-red-500 rounded'
          onSubmit={handleSubmit}
        >
          <div className='bg-gray-800 p-6 mb-4'>
            <label className=' text-softred block red_text_nav text-sm mb-2'>
              Email
            </label>
            <input
              className='shadow border rounded w-full py-2 px-3 text-black leading-tight'
              name='email'
              placeholder='Enter your name email'
              type='email'
              onChange={handleInputChange}
            />
          </div>
          <div className='bg-gray-800 p-6 mb-4'>
            <label className=' text-softred block red_text_nav text-sm mb-2'>
              Set Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight'
              name='password'
              type='password'
              placeholder='Set a password'
              onChange={handleInputChange}
            />
          </div>
          <div className='bg-gray-800 p-6 mb-6'>
            <label className=' text-softred block red_text_nav text-sm mb-2'>
              Confirm Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight'
              name='confirmPassword'
              type='password'
              placeholder='Confrim your password'
              onChange={handleInputChange}
            />
          </div>
          <div className='bg-gray-800 p-6'>
            <button
              type='submit'
              className='border border-red-500 hover:bg-softred hover:text-bgblack py-1 px-4 ml-4 rounded'
            >
              Sign Up
            </button>
          </div>
          {error && (
            <div className='mt-4 text-red-600 bg-gray-800 p-6'>
              <span onClick={/*dismissError*/ () => {}}>
                {error},{' '}
                <a
                  href='#'
                  onClick={/*dismissError*/ () => {}}
                  className='text-red-500 hover:underline'
                >
                  back
                </a>
              </span>
            </div>
          )}
          <Link href='/sign-in'>Already have an account?</Link>
        </form>
        <a href='/api/auth/signin/github'>Sign in with GitHub</a>
      </div>
    </>
  );
};

export default SignUp;
