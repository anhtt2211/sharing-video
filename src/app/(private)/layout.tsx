'use client';

import { getMeApi } from '@/apis/auth.api';
import { useAuth } from '@/hooks/useAuth'; // Custom hook for authentication
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  console.log('🚀 ~ user:', user);

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
    return <div>Loading...</div>; // Or a loader component
  }

  return (
    <div>
      {/* Private Layout specific components like header, footer */}
      {children}
    </div>
  );
};

export default PrivateLayout;
