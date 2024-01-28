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
      if (!value) return '이미지 URL는 필수입니다.';
      return true;
    },
  },
});

const nameField = useField('name');
const profileImageField = useField('profileImage');
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
      v-model="profileImageField.value.value"
      :error-messages="profileImageField.errorMessage.value"
      placeholder="https://festa-go.site/image.png"
      variant="outlined"
      label="아티스트 이미지 URL"
    />
  </CreateForm>
</template>
