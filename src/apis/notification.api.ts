import { INofification } from '@/interfaces/notification.interface';
import { IBaseParams } from '@/interfaces/param.interface';
import axiosClient from '@/lib/axiosConfig';

export const getNotificationsApi = async ({
  page = 1,
  pageSize = 5,
}: IBaseParams): Promise<INofification[]> => {
  const response = await axiosClient.get('/notifications', {
    params: {
      page,
      pageSize,
    },
  });
  return response.data as INofification[];
};

export const markNotificationAsReadApi = async (id: string): Promise<void> => {
  await axiosClient.put(`/notifications/${id}/read`);
};
