import CreateAdminAccountApiSpec, { CreateAdminAccountRequest } from '@/api/spec/admin/CreateAdminAccountApiSpec.ts';
import ApiService from '@/api';

const RootAdminService = {
  createAdminAccount(request: CreateAdminAccountRequest) {
    return ApiService.request(CreateAdminAccountApiSpec, request);
  },
};

export default RootAdminService;
