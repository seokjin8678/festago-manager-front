import ApiSpec from '@/api/spec/ApiSpec.ts';

export type FetchFestivalsRequest = {
  // empty
}

export type FetchFestivalsResponse = {
  content: {
    id: number,
    name: string,
    schoolName: string,
    startDate: string,
    endDate: string,
    stageCount: number
  }[],
  totalElements: number
}

const FetchFestivalsApiSpec: ApiSpec = {
  url: '/admin/api/v1/festivals',
  method: 'GET',
};

export default FetchFestivalsApiSpec;
