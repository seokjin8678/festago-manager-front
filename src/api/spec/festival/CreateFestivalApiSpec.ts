import ApiSpec from '@/api/spec/ApiSpec.ts';

export type CreateFestivalRequest = {
  name: string,
  startDate: string,
  endDate: string,
  posterImageUrl: string,
  schoolId: number
}

export type CreateFestivalResponse = {
  // empty
}

const CreateFestivalApiSpec: ApiSpec = {
  url: '/admin/api/v1/festivals',
  method: 'POST',
};

export default CreateFestivalApiSpec;
