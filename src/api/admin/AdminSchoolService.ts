import { PagingRequest } from '@/api/PagingRequest.ts';
import { SearchRequest } from '@/api/SearchRequest.ts';
import ApiService from '@/api';
import { AxiosResponse } from 'axios';
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

/**
 * TODO 미래에 다음과 같은 형식이 되어야 함
 * ApiResponse 참조
 * {
 *   errorCode: null
 *   message: null,
 *   result: [
 *     {
 *       id: 1,
 *       domain: teco.ac.kr,
 *       name: 테코대학교
 *     }
 *   ]
 * }
 */

const AdminSchoolService = {
  fetchOneSchool(schoolId: number): Promise<AxiosResponse<FetchOneSchoolResponse>> {
    return ApiService.request(FetchOneSchoolApiSpec(schoolId));
  },
  fetchSchools(paging: PagingRequest, search: SearchRequest): Promise<AxiosResponse<FetchSchoolsResponse>> {
    return ApiService.request(FetchSchoolsApiSpec, {
      page: paging.page,
      size: paging.itemsPerPage,
      sortBy: paging.sortBy[0]?.key,
      order: paging.sortBy[0]?.order,
      searchKeyword: search.searchKeyword,
      filterKeyword: search.filterKeyword,
    });
  },
  createSchool(request: CreateSchoolRequest): Promise<AxiosResponse<CreateSchoolResponse>> {
    return ApiService.request(CreateSchoolApiSpec, request);
  },
  updateSchool(schoolId: number, request: UpdateSchoolRequest): Promise<AxiosResponse<UpdateSchoolResponse>> {
    return ApiService.request(UpdateSchoolApiSpec(schoolId), request);
  },
  deleteSchool(schoolId: number): Promise<AxiosResponse<DeleteSchoolResponse>> {
    return ApiService.request(DeleteSchoolApiSpec(schoolId));
  },
};

export default AdminSchoolService;
