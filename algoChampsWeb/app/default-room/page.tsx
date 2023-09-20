import IDE from '../components/Editor';
import HomeNavBar from '../components/home-navbar';
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';



const DefaultRoom = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect('/sign-in');
  }
	return (
		<main className='h-screen bg-bgblack'>
			<HomeNavBar />
      <div className='flex justify-center items-center mt-8'>
			<IDE />
      </div>
		</main>
	);
};

export default DefaultRoom;
