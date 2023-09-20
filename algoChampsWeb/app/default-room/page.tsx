import IDE from '../components/Editor';
import HomeNavBar from '../components/home-navbar';

const DefaultRoom = () => {
  return (
    <main className='h-screen bg-bgblack'>
      <HomeNavBar />
      <IDE />
    </main>
  );
};

export default DefaultRoom;
