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
  'GET': (url: string, queryParam: any = null) => axiosInstance.get(url, { params: queryParam }),
  'POST': (url: string, data: any = null) => axiosInstance.post(url, data),
  'PATCH': (url: string, data: any = null) => axiosInstance.patch(url, data),
  'DELETE': (url: string, data: any = null) => axiosInstance.delete(url, data),
  'PUT': (url: string, data: any = null) => axiosInstance.put(url, data),
};

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
