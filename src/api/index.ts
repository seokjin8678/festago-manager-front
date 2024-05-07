import axios, { AxiosResponse } from 'axios';
import FestagoError from '@/api/FestagoError.ts';
import ApiSpec from '@/api/spec/ApiSpec.ts';
import Toast from '@/utils/Toast.ts';
import { router } from '@/router';
import { useAuthStore } from '@/stores/useAuthStore.ts';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// TODO 리프레쉬 토큰 구현해야함
axiosInstance.interceptors.request.use(value => {
  const authStore = useAuthStore();
  if (authStore.isLogin && authStore.isTokenExpired) {
    router.push('/login').then(() => {
      Toast.error('로그인 토큰이 만료되었습니다.');
      authStore.logout();
    });
    throw new Error('로그인 토큰이 만료되었습니다.');
  }
  return value;
});

axiosInstance.interceptors.response.use(value => value, error => {
  const response = error.response;
  if (response) {
    if (response.status == 401) {
      router.push('/login').then(() => {
        const authStore = useAuthStore();
        Toast.error(response.data.message);
        authStore.logout();
      });
    }
    if (response.data.errorCode === 'INVALID_REQUEST_ARGUMENT') {
      console.log(response.data.result);
    }
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
  requestMultipart<T>(spec: ApiSpec, data: any = null): Promise<AxiosResponse<T>> {
    const { url, method } = spec;
    if (method !== 'POST') {
      throw new Error('POST 메서드만 사용할 수 있습니다.');
    }
    return axiosInstance.postForm(url, data);
  },
};

export default ApiService;
