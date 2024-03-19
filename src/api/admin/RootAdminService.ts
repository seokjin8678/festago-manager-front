import CreateAdminAccountApiSpec, { CreateAdminAccountRequest } from '@/api/spec/admin/CreateAdminAccountApiSpec.ts';
import ApiService from '@/api';
import FetchServerBuildTimeApiSpec, {
  FetchServerBuildTimeResponse,
} from '@/api/spec/admin/FetchServerBuildTimeApiSpec.ts';
import LogInfoApiSpec from '@/api/spec/admin/LogInfoApiSpec.ts';
import LogWarnApiSpec from '@/api/spec/admin/LogWarnApiSpec.ts';
import LogErrorApiSpec from '@/api/spec/admin/LogErrorApiSpec.ts';

const RootAdminService = {
  createAdminAccount(request: CreateAdminAccountRequest) {
    return ApiService.request(CreateAdminAccountApiSpec, request);
  },
  fetchServerBuildTime() {
    return ApiService.request<FetchServerBuildTimeResponse>(FetchServerBuildTimeApiSpec);
  },
  logInfo() {
    return ApiService.request(LogInfoApiSpec);
  },
  logWarn() {
    return ApiService.request(LogWarnApiSpec);
  },
  logError() {
    return ApiService.request(LogErrorApiSpec);
  },
};

export default RootAdminService;
