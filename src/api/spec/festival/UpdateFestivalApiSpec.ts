import ApiSpec from '@/api/spec/ApiSpec.ts';

export type UpdateFestivalRequest = {
  name: string,
  startDate: string,
  endDate: string,
  posterImageUrl: string
}

export type UpdateFestivalResponse = {
  // empty
}

const UpdateFestivalApiSpec = (festivalId: number): ApiSpec => ({
  url: `/admin/api/v1/festivals/${festivalId}`,
  method: 'PATCH',
});

export default UpdateFestivalApiSpec;
