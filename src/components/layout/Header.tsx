'use client';

import { Notifications } from '@/components/notification';
import { useAuth } from '@/hooks/useAuth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <header className='bg-gray-800 p-4 flex justify-between items-center'>
      <div className='flex items-center'>
        <a href='/' className='text-white text-xl font-bold mr-4'>
          Funny Movies
        </a>
      </div>
      <div className='flex items-center'>
        <span className='text-white mr-4'>Welcome {user?.username}</span>

        <Notifications />

        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
          onClick={() => router.push('/share')}
        >
          Share a movie
        </button>
        <button
          className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4'
          onClick={() => {
            Cookies.remove('token');
            router.push('/login');
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
