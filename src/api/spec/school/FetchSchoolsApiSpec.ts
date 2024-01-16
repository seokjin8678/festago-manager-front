import ApiSpec from '@/api/spec/ApiSpec.ts';

export type FetchSchoolsRequest = {
  // empty
}

export type FetchSchoolsResponse = {
  schools: {
    id: number,
    domain: string,
    name: string
  }[]
}

const FetchSchoolsApiSpec: ApiSpec = {
  url: '/schools',
  method: 'GET',
};

export default FetchSchoolsApiSpec;
