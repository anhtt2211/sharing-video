import axiosClient from '@/lib/axiosConfig';
import { IVideo, IVideoCreate } from '@/interfaces/video.interface';

export const getFeedsApi = async (): Promise<IVideo[]> => {
  const response = await axiosClient.get('/videos');
  return response.data as IVideo[];
};

export const createVideoApi = async (data: IVideoCreate): Promise<IVideo> => {
  const response = await axiosClient.post('/videos', data);
  return response.data as IVideo;
};
