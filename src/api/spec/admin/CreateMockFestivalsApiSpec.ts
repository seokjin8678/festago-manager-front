import ApiSpec from '@/api/spec/ApiSpec.ts';

export type CreateMockFestivalsRequest = {
  // empty
}

export type CreateMockFestivalsResponse = {
  // empty
}

const CreateMockFestivalsApiSpec: ApiSpec = {
  url: '/admin/api/v1/mock-data/festivals',
  method: 'POST',
};

export default CreateMockFestivalsApiSpec;
