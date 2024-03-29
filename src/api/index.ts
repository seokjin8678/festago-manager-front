import axios, { AxiosResponse } from 'axios';
import FestagoError from '@/api/FestagoError.ts';
import ApiSpec from '@/api/spec/ApiSpec.ts';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { router } from '@/router';
import { useAuthStore } from '@/stores/useAuthStore.ts';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(value => value, error => {
  const response = error.response;
  if (response) {
    if (response.status == 401) {
      router.push('/login').then(() => {
        const snackbarStore = useSnackbarStore();
        const authStore = useAuthStore();
        snackbarStore.showError(response.data.message);
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

  changeAccessToken(accessToken: string) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  },
};

export default ApiService;
