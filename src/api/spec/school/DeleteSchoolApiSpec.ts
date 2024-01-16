import ApiSpec from '@/api/spec/ApiSpec.ts';

export type DeleteSchoolRequest = {
  // empty
}

export type DeleteSchoolResponse = {
  // empty
}

const DeleteSchoolApiSpec = (schoolId: number): ApiSpec => ({
  url: `/admin/api/schools/${schoolId}`,
  method: 'DELETE',
});

export default DeleteSchoolApiSpec;
