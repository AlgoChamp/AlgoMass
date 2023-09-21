'use client';
import IDE from '../components/Editor';
import HomeNavBar from '../components/home-navbar';
import Examples from '../components/examples';

const DefaultRoom = () => {
  return (
		<main className='h-screen bg-bgblack'>
			<HomeNavBar />
			<div className='flex flec-col justify-between mt-8'>
				<Examples />
				<IDE />
			</div>
			<button
				className='text-softred'
				onClick={() => console.log('Test button clicked')}
			></button>
		</main>
	);
};

export default DefaultRoom;
