import Link from 'next/link';

const UserNavBar = () => {
  return (
    <div className='w-screen red_text_nav text-softred black_bg flex justify-between items-center'>
      <Link href='/'>
        <button className='p-4'>AlgoChamps</button>
      </Link>
    </div>
  );
};

export default UserNavBar;
