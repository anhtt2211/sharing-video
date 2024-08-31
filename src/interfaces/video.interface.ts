import { IUser } from '@/interfaces/user.interface';

export interface IVideo {
  id: string;
  videoId: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  url: string;
  user: IUser;
}

export interface IVideoCreate {
  url: string;
}
