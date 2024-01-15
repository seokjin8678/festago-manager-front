import ApiService from '@/api';
import { AuthType } from '@/type/AuthType.ts';

export type LoginResponse = {
  accessToken: string,
  username: string,
  authType: AuthType
}

const AuthService = {
  login(username: string, password: string) {
    return ApiService.post<LoginResponse>('/admin/api/login', {
      username,
      password,
    });
  },
  logout() {
    ApiService.changeAccessToken('');
    return ApiService.get<null>('/admin/api/logout');
  },
};

export default AuthService;
