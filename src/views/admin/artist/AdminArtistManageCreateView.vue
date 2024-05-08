<script setup lang="ts">

import Toast from '@/utils/Toast.ts';
import { useField, useForm } from 'vee-validate';
import { CreateArtistRequest } from '@/api/spec/artist/CreateArtistApiSpec.ts';
import AdminArtistService from '@/api/admin/AdminArtistService.ts';
import FestagoError from '@/api/FestagoError.ts';
import CreateForm from '@/components/form/CreateForm.vue';
import TextField from '@/components/form/textfield/TextField.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';
import ImageUploadDialog from '@/components/dialog/ImageUploadDialog.vue';
import { ref } from 'vue';

const { isSubmitting, handleSubmit, handleReset, setErrors } = useForm<CreateArtistRequest>({
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

const nameField = useField<string>('name');
const profileImageUrlField = useField<string>('profileImageUrl');
const backgroundImageUrlField = useField<string>('backgroundImageUrl');
const onSubmit = handleSubmit(async request => {
  try {
    await AdminArtistService.createArtist(request);
    handleReset();
    Toast.success('아티스트가 생성되었습니다!');
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
  />
  <CreateForm
    :on-submit="onSubmit"
    :loading="isSubmitting"
    form-title="아티스트 추가"
  >
    <TextField
      label="아티스트 이름"
      placeholder="아티스트 이름"
      v-model="nameField.value.value"
      :error-messages="nameField.errorMessage.value"
    />
    <TextField
      label="아티스트 프로필 이미지 URL"
      placeholder="https://image.com/profile-image.png"
      v-model="profileImageUrlField.value.value"
      :error-messages="profileImageUrlField.errorMessage.value"
      :readonly="true"
      @click="uploadProfileImage"
    />
    <TextField
      label="아티스트 백그라운드 이미지 URL"
      placeholder="https://image.com/background-image.png"
      v-model="backgroundImageUrlField.value.value"
      :error-messages="backgroundImageUrlField.errorMessage.value"
      :readonly="true"
      @click="uploadBackgroundImage"
    />
  </CreateForm>
</template>
