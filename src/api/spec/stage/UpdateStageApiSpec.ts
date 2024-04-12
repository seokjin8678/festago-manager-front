import ApiSpec from '@/api/spec/ApiSpec.ts';

export type UpdateStageRequest = {
  startTime: string,
  ticketOpenTime: string,
  artistIds: number[]
}

export type UpdateStageResponse = {
  // empty
}

const UpdateStageApiSpec = (stageId: number): ApiSpec => ({
  url: `/admin/api/v1/stages/${stageId}`,
  method: 'PATCH',
});

export default UpdateStageApiSpec;
