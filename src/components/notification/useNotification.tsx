'use client';

import {
  getNotificationsApi,
  markNotificationAsReadApi,
} from '@/apis/notification.api';
import { useAuth } from '@/hooks/useAuth';
import { INofification } from '@/interfaces/notification.interface';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import io from 'socket.io-client';

export const useNotification = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  const { data: notifications } = useQuery(
    'notifications',
    getNotificationsApi,
    {
      onSuccess: (data) => {
        queryClient.setQueryData<INofification[]>('notifications', data);
      },
    }
  );

  useEffect(() => {
    if (!user?.id) return;

    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_IO_URL || 'http://localhost:8000',
      {
        withCredentials: true,
      }
    );

    socket.on('connect', () => {
      console.log('Connected to notification socket');
      socket.emit('register', user.id);
    });

    socket.on('newNotification', (newNotification: INofification) => {
      queryClient.setQueryData<INofification[]>(
        'notifications',
        (oldNotifications) => {
          if (!oldNotifications) return [newNotification];

          // Add the new notification to the beginning of the array
          return [newNotification, ...oldNotifications];
        }
      );

      // Update unread count
      setUnreadCount((prevCount) => prevCount + 1);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

  useEffect(() => {
    if (!notifications) return;

    const unread = notifications.filter(
      (notification: INofification) => !notification.read
    ).length;
    setUnreadCount(unread);
  }, [notifications]);

  const onClickNotification = async (notification: INofification) => {
    if (notification.url) {
      router.push(notification.url);
    }
    await markNotificationAsReadApi(notification.id);
  };

  return {
    notifications,
    unreadCount,
    onClickNotification,
  };
};
