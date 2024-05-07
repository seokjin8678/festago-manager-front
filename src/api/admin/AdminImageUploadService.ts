import AdminImageUploadApiSpec, {
  AdminImageUploadRequest,
  AdminImageUploadResponse,
} from '@/api/spec/upload/AdminImageUploadApiSpec.ts';
import ApiService from '@/api';

const AdminImageUploadService = {
  uploadImage(request: AdminImageUploadRequest) {
    return ApiService.requestMultipart<AdminImageUploadResponse>(AdminImageUploadApiSpec, request);
  },
};

export default AdminImageUploadService;
