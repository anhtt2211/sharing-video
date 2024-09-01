'use client';

import { useRouter } from 'next/navigation';
import { useCallback,useEffect, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import io from 'socket.io-client';

import { useAuth } from '@/hooks/useAuth';

import {
  getNotificationsApi,
  markNotificationAsReadApi,
} from '@/apis/notification.api';
import { INofification } from '@/interfaces/notification.interface';

export const useNotification = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery(
      'notifications',
      ({ pageParam = 1 }) =>
        getNotificationsApi({ page: pageParam, pageSize: 5 }),
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.length ? allPages.length + 1 : undefined;
        },
        onSuccess: (data) => {
          const allNotifications = data.pages.flat();
          queryClient.setQueryData<INofification[]>(
            'notifications',
            allNotifications
          );
        },
      }
    );

  const notifications = data?.pages.flat() || [];

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
        (oldNotifications = []) => {
          return [newNotification, ...oldNotifications];
        }
      );

      setUnreadCount((prevCount) => prevCount + 1);
      refetch();
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id, queryClient, refetch]);

  useEffect(() => {
    if (!notifications.length) return;

    const unread = notifications.filter(
      (notification: INofification) => !notification.read
    ).length;
    setUnreadCount(unread);
  }, [notifications]);

  const onClickNotification = useCallback(
    async (notification: INofification) => {
      if (notification.url) {
        router.push(notification.url);
      }
      await markNotificationAsReadApi(notification.id);
      queryClient.setQueryData<INofification[]>(
        'notifications',
        (oldNotifications = []) =>
          oldNotifications.map((n) =>
            n.id === notification.id ? { ...n, read: true } : n
          )
      );
      setUnreadCount((prev) => prev - 1);
    },
    [router, queryClient]
  );

  return {
    notifications,
    unreadCount,
    onClickNotification,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
