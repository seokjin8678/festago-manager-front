import axios, { AxiosResponse } from 'axios';
import FestagoError from '@/api/FestagoError.ts';
import ApiSpec from '@/api/spec/ApiSpec.ts';

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

const apiActions = {
  'GET': <T>(url: string, queryParam: any = null): Promise<AxiosResponse<T>> => axiosInstance.get(url, { params: queryParam }),
  'POST': <T>(url: string, data: any = null): Promise<AxiosResponse<T>> => axiosInstance.post(url, data),
  'PATCH': <T>(url: string, data: any = null): Promise<AxiosResponse<T>> => axiosInstance.patch(url, data),
  'DELETE': <T>(url: string, data: any = null): Promise<AxiosResponse<T>> => axiosInstance.delete(url, data),
};

// TODO Promise<AxiosResponse<ApiResponse<T>>>와 같이 변경하려면 백엔드 API 명세가 변경되어야 함
const ApiService = {
  request<T>(spec: ApiSpec, data: any = null): Promise<AxiosResponse<T>> {
    const { url, method } = spec;
    const apiAction = apiActions[method];
    return apiAction(url, data);
  },

  changeAccessToken(accessToken: string) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  },
};

export default ApiService;
