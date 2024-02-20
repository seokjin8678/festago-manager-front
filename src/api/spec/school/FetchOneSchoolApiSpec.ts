import ApiSpec from '@/api/spec/ApiSpec.ts';

export type FetchOneSchoolRequest = {
  // empty
}

export type FetchOneSchoolResponse = {
  id: number,
  domain: string,
  name: string,
  region: string,
}

const FetchOneSchoolApiSpec = (schoolId: number): ApiSpec => ({
  url: `/admin/api/v1/schools/${schoolId}`,
  method: 'GET',
});

export default FetchOneSchoolApiSpec;
