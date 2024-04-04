import ApiService from '@/api';
import LoginApiSpec, { LoginRequest, LoginResponse } from '@/api/spec/auth/LoginApiSpec.ts';
import LogoutApiSpec, { LogoutResponse } from '@/api/spec/auth/LogoutApiSpec.ts';

const AuthService = {
  login(request: LoginRequest) {
    return ApiService.request<LoginResponse>(LoginApiSpec, request);
  },
  logout() {
    return ApiService.request<LogoutResponse>(LogoutApiSpec);
  },
};

export default AuthService;
