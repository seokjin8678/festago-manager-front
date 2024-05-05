import ApiService from '@/api';
import FetchArtistsApiSpec, { FetchArtistsResponse } from '@/api/spec/artist/FetchArtistsApiSpec.ts';
import CreateArtistApiSpec, {
  CreateArtistRequest,
  CreateArtistResponse,
} from '@/api/spec/artist/CreateArtistApiSpec.ts';
import FetchOneArtistApiSpec, { FetchOneArtistResponse } from '@/api/spec/artist/FetchOneArtistApiSpec.ts';
import UpdateArtistApiSpec, {
  UpdateArtistRequest,
  UpdateArtistResponse,
} from '@/api/spec/artist/UpdateArtistApiSpec.ts';
import DeleteArtistApiSpec from '@/api/spec/artist/DeleteArtistApiSpec.ts';
import { PagingRequest } from '@/api/PagingRequest.ts';
import { SearchRequest } from '@/api/SearchRequest.ts';

const AdminArtistService = {
  fetchArtists(paging: PagingRequest, search: SearchRequest) {
    return ApiService.request<FetchArtistsResponse>(FetchArtistsApiSpec, {
      page: paging.page,
      size: paging.itemsPerPage,
      sort: paging.sortBy[0] ? `${paging.sortBy[0].key},${paging.sortBy[0].order}` : null,
      searchKeyword: search.searchKeyword,
      searchFilter: search.searchFilter,
    });
  },
  createArtist(request: CreateArtistRequest) {
    return ApiService.request<CreateArtistResponse>(CreateArtistApiSpec, request);
  },
  fetchOneArtist(artistId: number) {
    return ApiService.request<FetchOneArtistResponse>(FetchOneArtistApiSpec(artistId));
  },
  updateArtist(artistId: number, request: UpdateArtistRequest) {
    return ApiService.request<UpdateArtistResponse>(UpdateArtistApiSpec(artistId), request);
  },
  deleteArtist(artistId: number) {
    return ApiService.request(DeleteArtistApiSpec(artistId));
  },
};

export default AdminArtistService;
