import ApiSpec from '@/api/spec/ApiSpec.ts';

export type DeleteArtistRequest = {
  // empty
}

export type DeleteArtistResponse = {
  // empty
}

const DeleteArtistApiSpec = (artistId: number): ApiSpec => ({
  url: `/admin/api/v1/artists/${artistId}`,
  method: 'DELETE',
});

export default DeleteArtistApiSpec;
