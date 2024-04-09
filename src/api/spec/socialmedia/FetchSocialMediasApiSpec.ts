import ApiSpec from '@/api/spec/ApiSpec.ts';
import { FetchOneSocialMediaResponse } from '@/api/spec/socialmedia/FetchOneSocialMediaApiSpec.ts';
import { OwnerType } from '@/type/socialmedia/OwnerType.ts';

export type FetchSocialMediasRequest = {
  // empty
}

export type FetchSocialMediasResponse = FetchOneSocialMediaResponse[]

const FetchSocialMediasApiSpec = (ownerId: number, ownerType: OwnerType): ApiSpec => ({
  url: `/admin/api/v1/socialmedias?ownerId=${ownerId}&ownerType=${ownerType}`,
  method: 'GET',
});

export default FetchSocialMediasApiSpec;
