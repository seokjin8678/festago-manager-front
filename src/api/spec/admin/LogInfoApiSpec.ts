import ApiSpec from '@/api/spec/ApiSpec.ts';

export type LogInfoRequest = {
  // empty
}

export type LogInfoResponse = {
  // empty
}

const LogInfoApiSpec: ApiSpec = {
  url: '/admin/api/info',
  method: 'GET',
};

export default LogInfoApiSpec;
