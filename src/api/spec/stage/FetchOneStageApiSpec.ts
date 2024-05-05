import ApiSpec from '@/api/spec/ApiSpec.ts';

export type FetchOneStageRequest = {
  // empty
}

export type FetchOneStageResponse = {
  id: number,
  startDateTime: string,
  ticketOpenTime: string,
  artists: {
    id: number,
    name: string
  }[],
  createdAt: string,
  updatedAt: string
}

const FetchOneStageApiSpec = (stageId: number): ApiSpec => ({
  url: `/admin/api/v1/stages/${stageId}`,
  method: 'GET',
});

export default FetchOneStageApiSpec;
