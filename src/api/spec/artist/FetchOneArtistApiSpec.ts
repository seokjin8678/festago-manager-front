import ApiSpec from '@/api/spec/ApiSpec.ts';

export type FetchOneArtistRequest = {
  // empty
}

export type FetchOneArtistResponse = {
  id: number,
  name: string,
  profileImage: string
}

const FetchOneArtistApiSpec = (artistId: number): ApiSpec => ({
  url: `/admin/api/v1/artists/${artistId}`,
  method: 'GET',
});

export default FetchOneArtistApiSpec;
