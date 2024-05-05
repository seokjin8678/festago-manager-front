import ApiSpec from '@/api/spec/ApiSpec.ts';

export type FetchServerBuildTimeRequest = {
  // empty
}

export type FetchServerBuildTimeResponse = string

const FetchServerBuildTimeApiSpec: ApiSpec = {
  url: '/admin/api/version',
  method: 'GET',
};

export default FetchServerBuildTimeApiSpec;
