import { IBaseParams } from '@/interfaces/param.interface';
import { IPaginateResponse, IResponse } from '@/interfaces/response.interface';
import { IVideo, IVideoCreate } from '@/interfaces/video.interface';
import axiosClient from '@/lib/axiosConfig';

export const getFeedsApi = async ({
  page = 1,
  pageSize = 10,
}: IBaseParams): Promise<IPaginateResponse<IVideo>> => {
  const response = await axiosClient.get<IPaginateResponse<IVideo>>('/videos', {
    params: {
      page,
      pageSize,
    },
  });

  return response.data;
};

export const createVideoApi = async (data: IVideoCreate): Promise<IVideo> => {
  const response = await axiosClient.post('/videos', data);
  return response.data as IVideo;
};
