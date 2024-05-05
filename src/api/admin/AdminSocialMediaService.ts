import ApiService from '@/api';
import FetchSocialMediasApiSpec, {
  FetchSocialMediasResponse,
} from '@/api/spec/socialmedia/FetchSocialMediasApiSpec.ts';
import { OwnerType } from '@/type/socialmedia/OwnerType.ts';
import CreateSocialMediaApiSpec, {
  CreateSocialMediaRequest,
  CreateSocialMediaResponse,
} from '@/api/spec/socialmedia/CreateSocialMediaApiSpec.ts';
import UpdateSocialMediaApiSpec, {
  UpdateSocialMediaRequest,
  UpdateSocialMediaResponse,
} from '@/api/spec/socialmedia/UpdateSocialMediaApiSpec.ts';
import DeleteSocialMediaApiSpec, {
  DeleteSocialMediaResponse,
} from '@/api/spec/socialmedia/DeleteSocialMediaApiSpec.ts';
import FetchOneSocialMediaApiSpec, {
  FetchOneSocialMediaResponse,
} from '@/api/spec/socialmedia/FetchOneSocialMediaApiSpec.ts';

const AdminSocialMediaService = {
  fetchOneSocialMedia(socialMediaId: number) {
    return ApiService.request<FetchOneSocialMediaResponse>(FetchOneSocialMediaApiSpec(socialMediaId));
  },
  fetchSchoolSocialMedias(schoolId: number) {
    return ApiService.request<FetchSocialMediasResponse>(FetchSocialMediasApiSpec(schoolId, OwnerType.SCHOOL));
  },
  fetchArtistSocialMedias(artistId: number) {
    return ApiService.request<FetchSocialMediasResponse>(FetchSocialMediasApiSpec(artistId, OwnerType.ARTIST));
  },
  createSocialMedia(request: CreateSocialMediaRequest) {
    return ApiService.request<CreateSocialMediaResponse>(CreateSocialMediaApiSpec, request);
  },
  updateSocialMedia(socialMediaId: number, request: UpdateSocialMediaRequest) {
    return ApiService.request<UpdateSocialMediaResponse>(UpdateSocialMediaApiSpec(socialMediaId), request);
  },
  deleteSocialMedia(socialMediaId: number) {
    return ApiService.request<DeleteSocialMediaResponse>(DeleteSocialMediaApiSpec(socialMediaId));
  },
};

export default AdminSocialMediaService;
