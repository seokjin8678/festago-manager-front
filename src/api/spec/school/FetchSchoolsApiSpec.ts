import ApiSpec from '@/api/spec/ApiSpec.ts';

export type FetchSchoolsRequest = {
  // empty
}

export type FetchSchoolsResponse = {
  content: {
    id: number,
    domain: string,
    name: string,
    region: string,
  }[],
  totalElements: number
}

const FetchSchoolsApiSpec: ApiSpec = {
  url: '/admin/api/v1/schools',
  method: 'GET',
};

export default FetchSchoolsApiSpec;
