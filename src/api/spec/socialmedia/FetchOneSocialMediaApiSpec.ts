import ApiSpec from '@/api/spec/ApiSpec.ts';
import { SocialMediaType } from '@/type/socialmedia/SocialMediaType.ts';
import { OwnerType } from '@/type/socialmedia/OwnerType.ts';

export type FetchOneSocialMediaRequest = {
  // empty
}

export type FetchOneSocialMediaResponse = {
  id: number,
  ownerId: number,
  ownerType: OwnerType,
  socialMediaType: SocialMediaType,
  name: string,
  logoUrl: string,
  url: string,
}

const FetchOneSocialMediaApiSpec = (socialMediaId: number): ApiSpec => ({
  url: `/admin/api/v1/socialmedias/${socialMediaId}`,
  method: 'GET',
});

export default FetchOneSocialMediaApiSpec;
