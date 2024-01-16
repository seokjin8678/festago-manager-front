import ApiSpec from '@/api/spec/ApiSpec.ts';

export type CreateSchoolRequest = {
  name: string,
  domain: string
}

export type CreateSchoolResponse = {
  id: number,
  domain: string,
  name: string
}

const CreateSchoolApiSpec: ApiSpec = {
  url: '/admin/api/schools',
  method: 'POST',
};

export default CreateSchoolApiSpec;
