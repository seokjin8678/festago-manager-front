import ApiSpec from '@/api/spec/ApiSpec.ts';

export type CreateStageRequest = {
  festivalId: number,
  startTime: string,
  ticketOpenTime: string,
  artistIds: number[]
}

export type CreateStageResponse = {
  // empty
}

const CreateStageApiSpec: ApiSpec = {
  url: '/admin/api/v1/stages',
  method: 'POST',
};

export default CreateStageApiSpec;
