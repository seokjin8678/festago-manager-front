import { AuthType } from '@/type/AuthType.ts';
import ApiSpec from '@/api/spec/ApiSpec.ts';

export interface LoginRequest {
  username: string,
  password: string
}

export interface LoginResponse {
  username: string,
  authType: AuthType
}

const LoginApiSpec: ApiSpec = {
  url: '/admin/api/v1/auth/login',
  method: 'POST',
};

export default LoginApiSpec;
