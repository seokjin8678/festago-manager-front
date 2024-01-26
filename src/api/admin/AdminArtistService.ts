import ApiService from '@/api';
import FetchArtistsApiSpec, { FetchArtistsResponse } from '@/api/spec/artist/FetchArtistsApiSpec.ts';
import CreateArtistApiSpec, {
  CreateArtistRequest,
  CreateArtistResponse,
} from '@/api/spec/artist/CreateArtistApiSpec.ts';

const AdminArtistService = {
  fetchArtists() {
    return ApiService.request<FetchArtistsResponse>(FetchArtistsApiSpec);
  },
  createArtist(request: CreateArtistRequest) {
    return ApiService.request<CreateArtistResponse>(CreateArtistApiSpec, request);
  },
};

export default AdminArtistService;
