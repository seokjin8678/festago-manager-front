import ApiSpec from '@/api/spec/ApiSpec.ts';

export type UpdateSchoolRequest = {
  name: string,
  domain: string
}

export type UpdateSchoolResponse = {
  // empty
}

const UpdateSchoolApiSpec = (schoolId: number): ApiSpec => ({
  url: `/admin/api/schools/${schoolId}`,
  method: 'PATCH',
});

export default UpdateSchoolApiSpec;
