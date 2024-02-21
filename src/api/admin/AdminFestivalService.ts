import CreateFestivalApiSpec, {
  CreateFestivalRequest,
  CreateFestivalResponse,
} from '@/api/spec/festival/CreateFestivalApiSpec.ts';
import ApiService from '@/api';

const AdminFestivalService = {
  createFestival(request: CreateFestivalRequest) {
    return ApiService.request<CreateFestivalResponse>(CreateFestivalApiSpec, request);
  },
};

export default AdminFestivalService;
