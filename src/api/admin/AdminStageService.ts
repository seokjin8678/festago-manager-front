import CreateStageApiSpec, { CreateStageRequest, CreateStageResponse } from '@/api/spec/stage/CreateStageApiSpec.ts';
import ApiService from '@/api';

const AdminStageService = {
  createStage(request: CreateStageRequest) {
    return ApiService.request<CreateStageResponse>(CreateStageApiSpec, request)
  }
}

export default AdminStageService;
