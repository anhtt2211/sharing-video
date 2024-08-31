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

export interface IRegisterResponse extends ILoginResponse {}

export interface ITokenPayload {
  id: string;
  email: string;
  username: string;
}
