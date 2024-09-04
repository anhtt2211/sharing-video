'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { registerApi } from '@/apis/auth.api'; // Assumed you have a register API similar to login API

// Define validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
});

type FormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  apiError?: {
    message: string;
  };
};

const RegisterPage: React.FC = () => {
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
      const { accessToken } = await registerApi(data);
      Cookies.set('token', accessToken);
      clearErrors();
      router.push('/');
    } catch (error: any) {
      setError('apiError', {
        message:
          error.response?.data?.message ||
          'Registration failed. Please try again.',
      } as FieldError);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      clearErrors('apiError');
    }
  }, [isSubmitting, clearErrors]);

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-center'>Register</h2>
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
            <label className='block text-gray-700'>Username</label>
            <input
              type='text'
              {...register('username')}
              className={`w-full px-4 py-2 border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.username ? 'focus:ring-red-500' : 'focus:ring-blue-400'
              }`}
            />
            {errors.username && (
              <span className='text-sm text-red-600'>
                {errors.username.message}
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

          <div className='space-y-2'>
            <label className='block text-gray-700'>Confirm Password</label>
            <input
              type='password'
              {...register('confirmPassword')}
              className={`w-full px-4 py-2 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? 'focus:ring-red-500'
                  : 'focus:ring-blue-400'
              }`}
            />
            {errors.confirmPassword && (
              <span
                className='
                text-sm text-red-600'
              >
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
