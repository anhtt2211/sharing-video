import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className='bg-gray-800 p-4 flex justify-between items-center'>
      <div className='flex items-center'>
        <a href='/' className='text-white text-xl font-bold mr-4'>
          Funny Movies
        </a>
      </div>
      <div className='flex items-center'>
        <span className='text-white mr-4'>Welcome someone@gmail.com</span>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
          onClick={() => router.push('/share')}
        >
          Share a movie
        </button>
        <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
          Logout
        </button>
      </div>
    </header>
  );
}
