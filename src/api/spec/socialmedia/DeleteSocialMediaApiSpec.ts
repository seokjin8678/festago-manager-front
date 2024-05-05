import ApiSpec from '@/api/spec/ApiSpec.ts';

export type DeleteSocialMediaRequest = {
  // empty
}

export type DeleteSocialMediaResponse = {
  // empty
}

const DeleteSocialMediaApiSpec = (socialMediaId: number): ApiSpec => ({
  url: `/admin/api/v1/socialmedias/${socialMediaId}`,
  method: 'DELETE',
});

export default DeleteSocialMediaApiSpec;
