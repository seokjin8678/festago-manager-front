import ApiSpec from '@/api/spec/ApiSpec.ts';

export type DeleteFestivalRequest = {
  // empty
}

export type DeleteFestivalResponse = {
  // empty
}

const DeleteFestivalApiSpec = (festivalId: number): ApiSpec => ({
  url: `/admin/api/v1/festivals/${festivalId}`,
  method: 'DELETE',
});

export default DeleteFestivalApiSpec;
