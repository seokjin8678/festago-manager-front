import ApiSpec from '@/api/spec/ApiSpec.ts';

export type UpdateArtistRequest = {
  name: string,
  profileImage: string
}

export type UpdateArtistResponse = {
  // empty
}

const UpdateArtistApiSpec = (artistId: number): ApiSpec => ({
  url: `/admin/api/v1/artists/${artistId}`,
  method: 'PUT',
});

export default UpdateArtistApiSpec;
