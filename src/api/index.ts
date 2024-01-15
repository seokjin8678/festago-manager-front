import axios, { AxiosResponse } from 'axios';
import FestagoError from '@/api/FestagoError.ts';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(value => value, error => {
  const response = error.response;
  if (response) {
    return Promise.reject(new FestagoError(
      response.data.errorCode,
      response.data.message,
      response.status,
      response.data.result,
    ));
  }
  return Promise.reject(new FestagoError(
    '',
    '서버에 연결할 수 없거나, 인터넷에 연결되어 있지 않습니다!',
    0,
    null,
  ));
});

// TODO Promise<AxiosResponse<ApiResponse<T>>>와 같이 변경하려면 백엔드 API 명세가 변경되어야 함
const ApiService = {
  get<T>(uri: string, queryParam: any = null): Promise<AxiosResponse<T>> {
    return axiosInstance.get(uri, { params: queryParam });
  },

  post<T>(uri: string, data: any): Promise<AxiosResponse<T>> {
    return axiosInstance.post(uri, data);
  },

  changeAccessToken(accessToken: string) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  },
};

export default ApiService;
