import CreateFestivalApiSpec, {
  CreateFestivalRequest,
  CreateFestivalResponse,
} from '@/api/spec/festival/CreateFestivalApiSpec.ts';
import ApiService from '@/api';
import { SearchRequest } from '@/api/SearchRequest.ts';
import { PagingRequest } from '@/api/PagingRequest.ts';
import FetchFestivalsApiSpec, { FetchFestivalsResponse } from '@/api/spec/festival/FetchFestivalsApiSpec.ts';

const AdminFestivalService = {
  createFestival(request: CreateFestivalRequest) {
    return ApiService.request<CreateFestivalResponse>(CreateFestivalApiSpec, request);
  },
  fetchFestivals(paging: PagingRequest, search: SearchRequest) {
    return ApiService.request<FetchFestivalsResponse>(FetchFestivalsApiSpec, {
      page: paging.page,
      size: paging.itemsPerPage,
      sort: paging.sortBy[0] ? `${paging.sortBy[0].key},${paging.sortBy[0].order}` : null,
      searchKeyword: search.searchKeyword,
      searchFilter: search.searchFilter,
    });
  },
};

export default AdminFestivalService;
