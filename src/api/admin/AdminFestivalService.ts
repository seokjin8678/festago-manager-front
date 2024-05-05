import CreateFestivalApiSpec, {
  CreateFestivalRequest,
  CreateFestivalResponse,
} from '@/api/spec/festival/CreateFestivalApiSpec.ts';
import ApiService from '@/api';
import { SearchRequest } from '@/api/SearchRequest.ts';
import { PagingRequest } from '@/api/PagingRequest.ts';
import FetchFestivalsApiSpec, { FetchFestivalsResponse } from '@/api/spec/festival/FetchFestivalsApiSpec.ts';
import FetchOneFestivalApiSpec, { FetchOneFestivalResponse } from '@/api/spec/festival/FetchOneFestivalApiSpec.ts';
import UpdateFestivalApiSpec, { UpdateFestivalRequest } from '@/api/spec/festival/UpdateFestivalApiSpec.ts';
import DeleteFestivalApiSpec from '@/api/spec/festival/DeleteFestivalApiSpec.ts';
import FetchFestivalStagesApiSpec, {
  FetchFestivalStagesResponse,
} from '@/api/spec/festival/FetchFestivalStagesApiSpec.ts';

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
  fetchOneFestival(festivalId: number) {
    return ApiService.request<FetchOneFestivalResponse>(FetchOneFestivalApiSpec(festivalId));
  },
  updateFestival(festivalId: number, request: UpdateFestivalRequest) {
    return ApiService.request(UpdateFestivalApiSpec(festivalId), request);
  },
  deleteFestival(festivalId: number) {
    return ApiService.request(DeleteFestivalApiSpec(festivalId));
  },
  fetchFestivalStages(festivalId: number) {
    return ApiService.request<FetchFestivalStagesResponse>(FetchFestivalStagesApiSpec(festivalId));
  },
};

export default AdminFestivalService;
