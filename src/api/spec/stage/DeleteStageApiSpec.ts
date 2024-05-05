import ApiSpec from '@/api/spec/ApiSpec.ts';

export type DeleteStageRequest = {
  // empty
}

export type DeleteStageResponse = {
  // empty
}

const DeleteStageApiSpec = (stageId: number): ApiSpec => ({
  url: `/admin/api/v1/stages/${stageId}`,
  method: 'DELETE',
});

export default DeleteStageApiSpec;
