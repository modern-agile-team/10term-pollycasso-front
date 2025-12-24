export interface LoginRequest {
  username: string;
  password: string;
}

export type LoginResponse = LoginSuccessResponse | LoginFailureResponse;

export interface LoginSuccessResponse {
  accessToken: string;
}

export interface LoginFailureResponse {
  code: number;
  message: string;
  errors?: { field: string; reason: string }[];
}

export interface SignupRequest {
  username: string;
  nickname: string;
  password: string;
}

export type SignupResponse = SignupSuccessResponse | SignupFailureResponse;

export interface SignupSuccessResponse {
  accessToken: string;
}

export interface SignupFailureResponse {
  code: number;
  message: string;
  errors?: { field: string; reason: string }[];
}
