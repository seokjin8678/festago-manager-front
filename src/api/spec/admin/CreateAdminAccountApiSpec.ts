import ApiSpec from '@/api/spec/ApiSpec.ts';

export type CreateAdminAccountRequest = {
  username: string,
  password: string
}

export type CreateAdminAccountResponse = {
  // empty
}

const CreateAdminAccountApiSpec: ApiSpec = {
  url: '/admin/api/signup',
  method: 'POST',
};

export default CreateAdminAccountApiSpec;
