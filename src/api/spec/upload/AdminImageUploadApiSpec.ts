import ApiSpec from '@/api/spec/ApiSpec.ts';

export type AdminImageUploadRequest = {
  image: File,
  ownerType?: string | undefined,
  ownerId?: number | undefined
}

export type AdminImageUploadResponse = {
  uploadUri: string
}

const AdminImageUploadApiSpec: ApiSpec = {
  url: '/admin/api/v1/upload/images',
  method: 'POST',
};

export default AdminImageUploadApiSpec;
