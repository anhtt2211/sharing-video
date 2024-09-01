export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest extends ILoginRequest {
  username: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export type IRegisterResponse = ILoginResponse

export interface ITokenPayload {
  id: string;
  email: string;
  username: string;
}
