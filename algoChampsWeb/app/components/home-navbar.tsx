import Link from 'next/link';

const HomeNavBar = () => {
  return (
    <div className='w-screen red_text_nav text-softred black_bg flex justify-between items-center'>
      <Link href='/'>
        <button className='p-4'>AlgoChamps</button>
      </Link>
      <div className='flex items-center p-4'>
        <Link href='/sign-in'>
          <button className='border border-red-500 hover:bg-softred hover:text-bgblack py-1 px-4 rounded'>
            Sign In
          </button>
        </Link>
        <Link href='/sign-up'>
          <button className='border border-red-500 hover:bg-softred hover:text-bgblack py-1 px-4 ml-4 rounded'>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeNavBar;
