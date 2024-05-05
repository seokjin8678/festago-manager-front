import ApiSpec from '@/api/spec/ApiSpec.ts';

export type UpdateSchoolRequest = {
  name: string,
  domain: string,
  region: string,
  logoUrl: string,
  backgroundImageUrl: string,
}

export type UpdateSchoolResponse = {
  // empty
}

const UpdateSchoolApiSpec = (schoolId: number): ApiSpec => ({
  url: `/admin/api/v1/schools/${schoolId}`,
  method: 'PATCH',
});

export default UpdateSchoolApiSpec;
