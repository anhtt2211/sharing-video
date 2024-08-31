import {
  ILoginRequest,
  ILoginResponse,
  IRegisterResponse,
  ITokenPayload,
} from '@/interfaces/auth.interface';
import axiosClient from '@/lib/axiosConfig';

export const loginApi = async (
  data: ILoginRequest
): Promise<ILoginResponse> => {
  const response = await axiosClient.post('/auth/login', data);
  return response.data as ILoginResponse;
};

export const registerApi = async (
  data: ILoginRequest
): Promise<IRegisterResponse> => {
  const response = await axiosClient.post('/auth/register', data);
  return response.data as IRegisterResponse;
};

export const getMeApi = async (): Promise<ITokenPayload> => {
  const response = await axiosClient.get('/users/me');
  return response.data as ITokenPayload;
};
