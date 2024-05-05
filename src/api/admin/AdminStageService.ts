import CreateStageApiSpec, { CreateStageRequest, CreateStageResponse } from '@/api/spec/stage/CreateStageApiSpec.ts';
import ApiService from '@/api';
import UpdateStageApiSpec, { UpdateStageRequest, UpdateStageResponse } from '@/api/spec/stage/UpdateStageApiSpec.ts';
import FetchOneStageApiSpec, { FetchOneStageResponse } from '@/api/spec/stage/FetchOneStageApiSpec.ts';
import DeleteStageApiSpec, { DeleteStageResponse } from '@/api/spec/stage/DeleteStageApiSpec.ts';

const AdminStageService = {
  createStage(request: CreateStageRequest) {
    return ApiService.request<CreateStageResponse>(CreateStageApiSpec, request);
  },
  updateStage(stageId: number, request: UpdateStageRequest) {
    return ApiService.request<UpdateStageResponse>(UpdateStageApiSpec(stageId), request);
  },
  deleteStage(stageId: number) {
    return ApiService.request<DeleteStageResponse>(DeleteStageApiSpec(stageId));
  },
  fetchOneStage(stageId: number) {
    return ApiService.request<FetchOneStageResponse>(FetchOneStageApiSpec(stageId));
  }
};

export default AdminStageService;
