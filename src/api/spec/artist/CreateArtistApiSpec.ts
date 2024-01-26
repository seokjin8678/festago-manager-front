import ApiSpec from '@/api/spec/ApiSpec.ts';

export type CreateArtistRequest = {
  name: string,
  profileImage: string
}

export type CreateArtistResponse = {
  // empty
}

const CreateArtistApiSpec: ApiSpec = {
  url: '/admin/api/v1/artists',
  method: 'POST',
};

export default CreateArtistApiSpec;
