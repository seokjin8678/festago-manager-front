<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useRoute } from 'vue-router';
import Toast from '@/utils/Toast.ts';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import RouterPath from '@/router/RouterPath.ts';
import AdminArtistService from '@/api/admin/AdminArtistService.ts';
import { UpdateArtistRequest } from '@/api/spec/artist/UpdateArtistApiSpec.ts';
import EditForm from '@/components/form/EditForm.vue';
import ReadonlyField from '@/components/form/textfield/ReadonlyField.vue';
import TextField from '@/components/form/textfield/TextField.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';
import ImageUploadDialog from '@/components/dialog/ImageUploadDialog.vue';

const route = useRoute();

onMounted(() => {
  artistId.value = parseInt(route.params.id as string);
  AdminArtistService.fetchOneArtist(artistId.value).then(response => {
    resetForm({ values: response.data });
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminArtistManageListView.path);
      Toast.error('해당 아티스트를 찾을 수 없습니다.');
    } else throw e;
  });
});

const { isSubmitting, meta, resetForm, setErrors, handleSubmit } = useForm<UpdateArtistRequest>({
  validationSchema: toTypedSchema(
    object({
      name: string({
        required_error: '아티스트 이름은 필수입니다.',
      }),
      profileImageUrl: string()
      .max(255, '프로필 이미지 URL은 255글자 미만이어야 합니다.')
      .startsWith('https://', '프로필 이미지 URL은 https://로 시작되어야 합니다.')
      .optional(),
      backgroundImageUrl: string()
      .max(255, '백그라운드 이미지 URL은 255글자 미만이어야 합니다.')
      .startsWith('https://', '백그라운드 이미지 URL은 https://로 시작되어야 합니다.')
      .optional(),
    }),
  ),
});

const onUpdateSubmit = handleSubmit(async request => {
  try {
    await AdminArtistService.updateArtist(artistId.value!, request);
    Toast.success('아티스트가 수정되었습니다.');
    resetForm({ values: request });
  } catch (e) {
    if (e instanceof FestagoError) {
      if (e.isValidError()) {
        setErrors(e.result);
      } else {
        Toast.error(e.message);
      }
    } else throw e;
  }
});

function onDeleteSubmit() {
  AdminArtistService.deleteArtist(artistId.value!).then(() => {
    Toast.success('아티스트가 삭제되었습니다.');
    router.push(RouterPath.Admin.AdminArtistManageListView.path);
  }).catch(e => {
    if (e instanceof FestagoError) {
      Toast.error(e.message);
    } else throw e;
  });
}

const artistId = ref<number>();
const nameField = useField<string>('name');
const profileImageUrlField = useField<string>('profileImageUrl');
const backgroundImageUrlField = useField<string>('backgroundImageUrl');

const showImageUploadDialog = ref(false);
const uploadDialogTitle = ref('');
const uploadCallback = ref((_: string) => {
});

function uploadProfileImage() {
  showImageUploadDialog.value = true;
  uploadDialogTitle.value = '프로필 이미지 업로드';
  uploadCallback.value = uploadUri => {
    profileImageUrlField.value.value = uploadUri;
  };
}

function uploadBackgroundImage() {
  showImageUploadDialog.value = true;
  uploadDialogTitle.value = '백그라운드 이미지 업로드';
  uploadCallback.value = uploadUri => {
    backgroundImageUrlField.value.value = uploadUri;
  };
}

</script>

<template>
  <ImageUploadDialog
    v-model="showImageUploadDialog"
    :title="uploadDialogTitle"
    @upload-callback="uploadCallback"
    :owner-id="artistId"
    owner-type="ARTIST"
  />
  <EditForm
    form-title="아티스트 수정/삭제"
    :on-update-submit="onUpdateSubmit"
    :on-delete-submit="onDeleteSubmit"
    :loading="isSubmitting"
    :is-touched="meta.dirty"
  >
    <ReadonlyField label="ID" :value="artistId" />
    <TextField
      label="이름"
      placeholder="아티스트 이름"
      v-model="nameField.value.value"
      :error-messages="nameField.errorMessage.value"
    />
    <TextField
      label="프로필 이미지 URL"
      placeholder="https://image.com/profile-image.png"
      v-model="profileImageUrlField.value.value"
      :error-messages="profileImageUrlField.errorMessage.value"
      :readonly="true"
      @click="uploadProfileImage"
    />
    <TextField
      label="백그라운드 이미지 URL"
      placeholder="https://image.com/background-image.png"
      v-model="backgroundImageUrlField.value.value"
      :error-messages="backgroundImageUrlField.errorMessage.value"
      :readonly="true"
      @click="uploadBackgroundImage"
    />
  </EditForm>
</template>
