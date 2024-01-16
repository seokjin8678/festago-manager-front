import ApiService from '@/api';
import LoginApiSpec, { LoginRequest, LoginResponse } from '@/api/spec/auth/LoginApiSpec.ts';
import LogoutApiSpec, { LogoutRequest, LogoutResponse } from '@/api/spec/auth/LogoutApiSpec.ts';

const AuthService = {
  login(request: LoginRequest) {
    return ApiService.request<LoginResponse>(LoginApiSpec, request);
  },
  logout(request: LogoutRequest) {
    ApiService.changeAccessToken('');
    return ApiService.request<LogoutResponse>(LogoutApiSpec, request);
  },
};

export default AuthService;
