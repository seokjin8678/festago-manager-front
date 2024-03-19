import ApiSpec from '@/api/spec/ApiSpec.ts';

export type LogWarnRequest = {
  // empty
}

export type LogWarnResponse = {
  // empty
}

const LogWarnApiSpec: ApiSpec = {
  url: '/admin/api/warn',
  method: 'GET',
};

export default LogWarnApiSpec;
