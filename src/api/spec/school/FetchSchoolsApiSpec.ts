import ApiSpec from '@/api/spec/ApiSpec.ts';
import { FetchOneSchoolResponse } from '@/api/spec/school/FetchOneSchoolApiSpec.ts';

export type FetchSchoolsRequest = {
  // empty
}

export type FetchSchoolsResponse = {
  content: FetchOneSchoolResponse[],
  totalElements: number
}

const FetchSchoolsApiSpec: ApiSpec = {
  url: '/admin/api/v1/schools',
  method: 'GET',
};

export default FetchSchoolsApiSpec;
