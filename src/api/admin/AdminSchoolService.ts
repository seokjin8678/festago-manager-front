import { PagingRequest } from '@/api/PagingRequest.ts';
import { SearchRequest } from '@/api/SearchRequest.ts';
import ApiService from '@/api';
import UpdateSchoolApiSpec, {
  UpdateSchoolRequest,
  UpdateSchoolResponse,
} from '@/api/spec/school/UpdateSchoolApiSpec.ts';
import FetchSchoolsApiSpec, { FetchSchoolsResponse } from '@/api/spec/school/FetchSchoolsApiSpec.ts';
import CreateSchoolApiSpec, {
  CreateSchoolRequest,
  CreateSchoolResponse,
} from '@/api/spec/school/CreateSchoolApiSpec.ts';
import DeleteSchoolApiSpec, { DeleteSchoolResponse } from '@/api/spec/school/DeleteSchoolApiSpec.ts';
import FetchOneSchoolApiSpec, { FetchOneSchoolResponse } from '@/api/spec/school/FetchOneSchoolApiSpec.ts';

const AdminSchoolService = {
  fetchOneSchool(schoolId: number) {
    return ApiService.request<FetchOneSchoolResponse>(FetchOneSchoolApiSpec(schoolId));
  },
  fetchSchools(paging: PagingRequest, search: SearchRequest) {
    return ApiService.request<FetchSchoolsResponse>(FetchSchoolsApiSpec, {
      page: paging.page,
      size: paging.itemsPerPage,
      sort: paging.sortBy ? `${paging.sortBy.key},${paging.sortBy.order}` : null,
      searchKeyword: search.searchKeyword,
      searchFilter: search.searchFilter,
    });
  },
  createSchool(request: CreateSchoolRequest) {
    return ApiService.request<CreateSchoolResponse>(CreateSchoolApiSpec, request);
  },
  updateSchool(schoolId: number, request: UpdateSchoolRequest) {
    return ApiService.request<UpdateSchoolResponse>(UpdateSchoolApiSpec(schoolId), request);
  },
  deleteSchool(schoolId: number) {
    return ApiService.request<DeleteSchoolResponse>(DeleteSchoolApiSpec(schoolId));
  },
};

export default AdminSchoolService;
