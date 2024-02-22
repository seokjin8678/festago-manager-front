import ApiSpec from '@/api/spec/ApiSpec.ts';
import { FetchOneFestivalResponse } from '@/api/spec/festival/FetchOneFestivalApiSpec.ts';

export type FetchFestivalsRequest = {
  // empty
}

export type FetchFestivalsResponse = {
  content: FetchOneFestivalResponse[],
  totalElements: number
}

const FetchFestivalsApiSpec: ApiSpec = {
  url: '/admin/api/v1/festivals',
  method: 'GET',
};

export default FetchFestivalsApiSpec;
