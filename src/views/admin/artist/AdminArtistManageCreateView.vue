<script setup lang="ts">

import { ref } from 'vue';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { useField, useForm } from 'vee-validate';
import { CreateArtistRequest } from '@/api/spec/artist/CreateArtistApiSpec.ts';
import AdminArtistService from '@/api/admin/AdminArtistService.ts';
import FestagoError from '@/api/FestagoError.ts';
import CreateForm from '@/components/form/CreateForm.vue';

const snackbarStore = useSnackbarStore();
const { handleSubmit, handleReset } = useForm<CreateArtistRequest>({
  validationSchema: {
    name(value: string) {
      if (!value) return '아티스트 이름은 필수입니다.';
      return true;
    },
    profileImage(value: string) {
      if (!value) return '프로필 이미지 URL은 필수입니다.';
      return true;
    },
    backgroundImageUrl(value: string) {
      if (!value) return '백그라운드 이미지 URL은 필수입니다.';
      return true;
    },
  },
});

const nameField = useField('name');
const profileImageUrlField = useField('profileImage');
const backgroundImageUrlField = useField('backgroundImageUrl');
const loading = ref(false);

const onSubmit = handleSubmit(request => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  AdminArtistService.createArtist(request).then(() => {
    handleReset();
    loading.value = false;
    snackbarStore.showSuccess('아티스트가 생성되었습니다!');
  }).catch(e => {
    if (e instanceof FestagoError) {
      snackbarStore.showError(e.message);
    } else throw e;
  });
});
</script>

<template>
  <CreateForm
    :on-submit="onSubmit"
    :loading="loading"
    form-title="아티스트 추가"
  >
    <v-text-field
      class="mb-3"
      v-model="nameField.value.value"
      :error-messages="nameField.errorMessage.value"
      placeholder="아티스트 이름"
      variant="outlined"
      label="아티스트 이름"
    />
    <v-text-field
      class="mb-3"
      v-model="profileImageUrlField.value.value"
      :error-messages="profileImageUrlField.errorMessage.value"
      placeholder="https://festa-go.site/image.png"
      variant="outlined"
      label="아티스트 프로필 이미지 URL"
    />
    <v-text-field
      class="mb-3"
      v-model="backgroundImageUrlField.value.value"
      :error-messages="backgroundImageUrlField.errorMessage.value"
      placeholder="https://festa-go.site/image.png"
      variant="outlined"
      label="아티스트 백그라운드 이미지 URL"
    />
  </CreateForm>
</template>
