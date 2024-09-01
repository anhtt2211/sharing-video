'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useAuth } from '@/hooks/useAuth'; // Custom hook for authentication

import Header from '@/components/layout/Header';

import { getMeApi } from '@/apis/auth.api';

const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const queryClient = new QueryClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMeApi();
        setUser(response);
      } catch (error) {
        router.push('/login');
        Cookies.remove('token');
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, router, setUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
    </QueryClientProvider>
  );
};

export default PrivateLayout;
