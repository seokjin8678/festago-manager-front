import ApiSpec from '@/api/spec/ApiSpec.ts';

export type LogErrorRequest = {
  // empty
}

export type LogErrorResponse = {
  // empty
}

const LogErrorApiSpec: ApiSpec = {
  url: '/admin/api/error',
  method: 'GET',
};

export default LogErrorApiSpec;
