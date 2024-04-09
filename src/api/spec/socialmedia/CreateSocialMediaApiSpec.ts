import ApiSpec from '@/api/spec/ApiSpec.ts';
import { OwnerType } from '@/type/socialmedia/OwnerType.ts';
import { SocialMediaType } from '@/type/socialmedia/SocialMediaType.ts';

export type CreateSocialMediaRequest = {
  ownerId: number,
  ownerType: OwnerType,
  socialMediaType: SocialMediaType,
  name: string,
  logoUrl: string,
  url: string,
}

export type CreateSocialMediaResponse = {
  // empty
}

const CreateSocialMediaApiSpec: ApiSpec = {
  url: '/admin/api/v1/socialmedias',
  method: 'POST',
};

export default CreateSocialMediaApiSpec;
