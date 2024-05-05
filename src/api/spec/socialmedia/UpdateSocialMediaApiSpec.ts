import ApiSpec from '@/api/spec/ApiSpec.ts';

export type UpdateSocialMediaRequest = {
  name: string,
  logoUrl: string,
  url: string,
}

export type UpdateSocialMediaResponse = {
  // empty
}

const UpdateSocialMediaApiSpec = (socialMediaId: number): ApiSpec => ({
  url: `/admin/api/v1/socialmedias/${socialMediaId}`,
  method: 'PATCH',
});

export default UpdateSocialMediaApiSpec;
