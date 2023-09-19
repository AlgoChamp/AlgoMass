import Link from 'next/link';

const UserNavBar = () => {
  return (
    <div>
      <Link href='/'>
        <button>Home</button>
      </Link>
    </div>
  );
};

export default UserNavBar;
