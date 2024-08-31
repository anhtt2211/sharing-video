'use client';

import { getMeApi } from '@/apis/auth.api';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth'; // Custom hook for authentication
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { user, setUser } = useAuth();

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
    <div>
      <Header />
      {children}
    </div>
  );
};

export default PrivateLayout;
