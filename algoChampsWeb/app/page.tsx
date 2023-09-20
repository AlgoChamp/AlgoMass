import HomeNavBar from './components/home-navbar';
//import { options } from './api/auth/[...nextauth]/options';
//import { getServerSession } from 'next-auth';

const Home = () => {
  //const session = await getServerSession(options);
  return (
    <main className='h-screen bg-bgblack'>
      <HomeNavBar />
      <div className='landing_text text-softred ml-3'>3.. 2.. 1.. FIGHT!</div>
      <div className='landing_body text-softred ml-3'>
        Challenge Your Friends, Improve Your Skills.
      </div>
    </main>
  );
};

export default Home;
