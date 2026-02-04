export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;

export interface ApiSuccessResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ApiFailureResponse {
  code: string;
  message: string;
  errors?: { field: string; reason: string }[];
}
