import ApiSpec from '@/api/spec/ApiSpec.ts';

export type FetchOneFestivalRequest = {
  // empty
}

export type FetchOneFestivalResponse = {
  id: number,
  name: string,
  schoolId: number,
  schoolName: string,
  startDate: string,
  endDate: string,
  posterImageUrl: string,
  stageCount: number
}

const FetchOneFestivalApiSpec = (festivalId: number): ApiSpec => ({
  url: `/admin/api/v1/festivals/${festivalId}`,
  method: 'GET',
});

export default FetchOneFestivalApiSpec;
