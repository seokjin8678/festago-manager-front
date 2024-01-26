import ApiService from '@/api';
import FetchArtistsApiSpec, { FetchArtistsResponse } from '@/api/spec/artist/FetchArtists.ts';

const AdminArtistService = {
  fetchArtists() {
    return ApiService.request<FetchArtistsResponse>(FetchArtistsApiSpec);
  },
};

export default AdminArtistService;
