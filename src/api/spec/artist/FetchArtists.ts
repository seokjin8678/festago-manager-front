import ApiSpec from '@/api/spec/ApiSpec.ts';

export type FetchArtistsResponse = {
  id: number,
  name: string,
  profileImage: string
}[]

const FetchArtistsApiSpec: ApiSpec = {
  url: '/admin/api/v1/artists',
  method: 'GET',
};

export default FetchArtistsApiSpec;
