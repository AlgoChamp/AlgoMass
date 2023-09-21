import HomeNavBar from './components/home-navbar';
<<<<<<< Updated upstream
import Link from 'next/link';
=======
//import { options } from './api/auth/[...nextauth]/options';
//import { getServerSession } from 'next-auth';
>>>>>>> Stashed changes

const Home = () => {
  //const session = await getServerSession(options);
  return (
    <main className='h-screen bg-bgblack'>
      <HomeNavBar />
      <div className='landing_text text-softred ml-3'>
        3.. 2.. 1..{' '}
        <span className='hover:text-green'>
          <Link href='/default-room'>FIGHT!</Link>
        </span>
      </div>
      <div className='landing_body text-softred ml-3'>
        Challenge Your Friends, Improve Your Skills.
      </div>
    </main>
  );
};

export default Home;
