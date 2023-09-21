'use client'
import IDE from '../components/Editor';
import HomeNavBar from '../components/home-navbar';

const DefaultRoom = () => {
  return (
    <main className='h-screen bg-bgblack'>
      <HomeNavBar />
      <div className='flex justify-center items-center mt-8'>
        <IDE />
      </div>
      <button className='text-softred' onClick={() => console.log("Test button clicked")}>Test</button>
    </main>
  );
};

export default DefaultRoom;
