'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldError, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { loginApi } from '@/apis/auth.api';

// Define validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

type FormData = {
  email: string;
  password: string;
  apiError?: {
    message: string;
  };
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const { accessToken } = await loginApi(data);
      Cookies.set('token', accessToken);
      clearErrors();
      router.push('/');
    } catch (error: any) {
      setError('apiError', {
        message:
          error.response?.data?.message || 'Login failed. Please try again.',
      } as FieldError);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-center'>Login</h2>
        {errors.apiError && (
          <span className='block text-sm text-red-600 text-center mb-4'>
            {errors.apiError.message?.toString()}
          </span>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-2'>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              {...register('email')}
              className={`w-full px-4 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-400'
              }`}
            />
            {errors.email && (
              <span className='text-sm text-red-600'>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className='space-y-2'>
            <label className='block text-gray-700'>Password</label>
            <input
              type='password'
              {...register('password')}
              className={`w-full px-4 py-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-400'
              }`}
            />
            {errors.password && (
              <span className='text-sm text-red-600'>
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
          <button
            type='button'
            onClick={() => router.push('/register')}
            className='w-full px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
