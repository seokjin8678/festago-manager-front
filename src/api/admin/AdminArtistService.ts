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

const AdminArtistService = {
  fetchArtists() {
    return ApiService.request<FetchArtistsResponse>(FetchArtistsApiSpec);
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
