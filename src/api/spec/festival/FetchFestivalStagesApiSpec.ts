import ApiSpec from '@/api/spec/ApiSpec.ts';

export type FetchFestivalStagesRequest = {
  // empty
}

export type FetchFestivalStagesResponse = {
  id: number,
  startDateTime: string,
  ticketOpenTime: string,
  artists: {
    id: number,
    name: string
  }[],
  createdAt: string,
  updatedAt: string
}[]

const FetchFestivalStagesApiSpec = (festivalId: number): ApiSpec => ({
  url: `/admin/api/v1/festivals/${festivalId}/stages`,
  method: 'GET',
});

export default FetchFestivalStagesApiSpec;
