import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import queryString from 'query-string';

const paramsSerializer = (params: Record<string, any>) =>
  queryString.stringify(params, { skipEmptyString: true, skipNull: true });

const common: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  paramsSerializer,
};

export const instance = axios.create(common);

export type { AxiosError, AxiosRequestConfig } from 'axios';
