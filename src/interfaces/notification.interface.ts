import { IUser } from '@/interfaces/user.interface';

export interface INofification {
  id: string;
  message: string;
  url?: string; // Optional URL for additional context or redirection
  recipient: IUser;
  sender: IUser;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
