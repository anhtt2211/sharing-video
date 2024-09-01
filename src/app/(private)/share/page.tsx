'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { createVideoApi } from '@/apis/video.api';

interface FormData {
  url: string;
}

// Define validation schema with yup
const schema = yup.object().shape({
  url: yup
    .string()
    .url('Please enter a valid URL')
    .matches(
      /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
      'Please enter a valid YouTube URL'
    )
    .required('YouTube URL is required'),
});

export default function ShareMovie() {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await createVideoApi({
        url: data.url,
      });
      setMessage('Video shared successfully!');
      console.log('Video data:', response);
    } catch (error) {
      setMessage('Failed to share the video. Please try again.');
      console.error('Error sharing video:', error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-xl'>
        <h2 className='text-center text-lg mb-4'>Share a Youtube movie</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='url'
            >
              Youtube URL:
            </label>
            <input
              id='url'
              type='text'
              placeholder='Enter YouTube URL'
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.url ? 'border-red-500' : ''
              }`}
              {...register('url')}
            />
            {errors.url && (
              <p className='text-red-500 text-xs italic'>
                {errors.url.message}
              </p>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Share
            </button>
          </div>
          {message && (
            <p className='text-center mt-4 text-green-500'>{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
