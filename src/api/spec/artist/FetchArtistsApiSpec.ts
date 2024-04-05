import ApiSpec from '@/api/spec/ApiSpec.ts';
import { FetchOneArtistResponse } from '@/api/spec/artist/FetchOneArtistApiSpec.ts';

export type FetchArtistsResponse = {
  content: FetchOneArtistResponse[],
  totalElements: number
}

const FetchArtistsApiSpec: ApiSpec = {
  url: '/admin/api/v1/artists',
  method: 'GET',
};

export default FetchArtistsApiSpec;
