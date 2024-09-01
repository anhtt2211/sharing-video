'use client';

import { markNotificationAsReadApi } from '@/apis/notification.api';
import { useNotification } from '@/components/notification/useNotification';
import { INofification } from '@/interfaces/notification.interface';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaBell } from 'react-icons/fa';

export const Notifications = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { notifications, unreadCount, onClickNotification } = useNotification();

  const toggleNotification = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='relative'>
      <button
        className='relative text-white focus:outline-none mr-4'
        onClick={toggleNotification}
      >
        <FaBell size={24} />
        {unreadCount > 0 && (
          <span className='absolute top-0 right-0 inline-flex items-center justify-center p-1 text-[10px] font-bold leading-none text-red-100 bg-red-600 rounded-full'>
            {unreadCount}
          </span>
        )}
      </button>
      {showDropdown && (
        <div className='absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20'>
          <div className='py-2'>
            {notifications?.length === 0 ? (
              <p className='text-gray-700 px-4 py-2'>No notifications</p>
            ) : (
              notifications?.map((notification: INofification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClickNotification={() => onClickNotification(notification)}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const NotificationItem = ({
  notification,
  onClickNotification,
}: {
  notification: INofification;
  onClickNotification: () => void;
}) => {
  return (
    <div
      onClick={onClickNotification}
      className={`
        p-4 mb-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
        ${
          notification.read
            ? 'bg-gray-100 hover:bg-gray-200'
            : 'bg-blue-50 hover:bg-blue-100'
        }
      `}
    >
      <div className='flex justify-between items-start'>
        <div className='flex-grow'>
          <p
            className={`text-sm ${
              notification.read ? 'text-gray-600' : 'text-black font-semibold'
            }`}
          >
            {notification.message}
          </p>
          <p className='text-xs text-gray-500 mt-1'>
            From: {notification.sender.username}
          </p>
        </div>
        {!notification.read && (
          <span className='h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-1'></span>
        )}
      </div>
      <p className='text-xs text-gray-400 mt-2'>
        {formatDistanceToNow(new Date(notification.createdAt), {
          addSuffix: true,
        })}
      </p>
    </div>
  );
};
