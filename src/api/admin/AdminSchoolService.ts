import { PagingRequest } from '@/api/PagingRequest.ts';
import { SearchRequest } from '@/api/SearchRequest.ts';
import ApiService from '@/api';
import { AxiosResponse } from 'axios';

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
export type SchoolResponses = {
  schools: SchoolResponse[]
}

export type SchoolResponse = {
  id: number,
  domain: string,
  name: string
}

export type SchoolCreateRequest = {
  name: string,
  domain: string
}

export type SchoolUpdateRequest = {
  name: string,
  domain: string
}

const AdminSchoolService = {
  fetchSchool(schoolId: number): Promise<AxiosResponse<SchoolResponse>> {
    return ApiService.get(`/schools/${schoolId}`);
  },
  fetchSchools(paging: PagingRequest, search: SearchRequest): Promise<AxiosResponse<SchoolResponses>> {
    return ApiService.get('/schools', {
      page: paging.page,
      size: paging.itemsPerPage,
      sortBy: paging.sortBy[0]?.key,
      order: paging.sortBy[0]?.order,
      searchKeyword: search.searchKeyword,
      filterKeyword: search.filterKeyword,
    });
  },
  createSchool(request: SchoolCreateRequest): Promise<AxiosResponse<SchoolResponse>> {
    return ApiService.post('/admin/api/schools', request);
  },
  updateSchool(schoolId: number, request: SchoolUpdateRequest) {
    return ApiService.patch(`/admin/api/schools/${schoolId}`, request);
  },
  deleteSchool(schoolId: number) {
    return ApiService.delete(`/admin/api/schools/${schoolId}`);
  },
};

export default AdminSchoolService;
