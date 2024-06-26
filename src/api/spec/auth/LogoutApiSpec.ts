import ApiSpec from '@/api/spec/ApiSpec.ts';

export interface LogoutRequest {
  // empty
}

export interface LogoutResponse {
  // empty
}

const LogoutApiSpec: ApiSpec = {
  url: '/admin/api/v1/auth/logout',
  method: 'GET',
};

export default LogoutApiSpec;
