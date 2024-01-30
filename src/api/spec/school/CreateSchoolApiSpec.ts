import ApiSpec from '@/api/spec/ApiSpec.ts';

export type CreateSchoolRequest = {
  name: string,
  domain: string,
  region: string,
}

export type CreateSchoolResponse = {
  // empty
}

const CreateSchoolApiSpec: ApiSpec = {
  url: '/admin/api/v1/schools',
  method: 'POST',
};

export default CreateSchoolApiSpec;
