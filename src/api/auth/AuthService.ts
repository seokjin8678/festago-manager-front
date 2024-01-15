import ApiService from '@/api';
import { AuthType } from '@/type/AuthType.ts';

export type LoginRequest = {
  username: string,
  password: string
}

export type LoginResponse = {
  accessToken: string,
  username: string,
  authType: AuthType
}

const AuthService = {
  login(request: LoginRequest) {
    return ApiService.post<LoginResponse>('/admin/api/login', request);
  },
  logout() {
    ApiService.changeAccessToken('');
    return ApiService.get<null>('/admin/api/logout');
  },
};

export default AuthService;
