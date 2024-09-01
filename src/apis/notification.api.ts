import { INofification } from '@/interfaces/notification.interface';
import axiosClient from '@/lib/axiosConfig';

export const getNotificationsApi = async (): Promise<INofification[]> => {
  const response = await axiosClient.get('/notifications');
  return response.data as INofification[];
};

export const markNotificationAsReadApi = async (id: string): Promise<void> => {
  await axiosClient.put(`/notifications/${id}/read`);
};
