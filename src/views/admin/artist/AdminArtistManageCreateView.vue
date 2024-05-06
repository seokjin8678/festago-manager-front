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

const { isSubmitting, handleSubmit, handleReset, setErrors } = useForm<CreateArtistRequest>({
  validationSchema: toTypedSchema(
    object({
      name: string({
        required_error: '아티스트 이름은 필수입니다.',
      }),
      profileImageUrl: string({
        required_error: '프로필 이미지 URL은 필수입니다.',
      })
      .max(255, '프로필 이미지 URL은 255글자 미만이어야 합니다.')
      .startsWith('https://', '프로필 이미지 URL은 https://로 시작되어야 합니다.'),
      backgroundImageUrl: string({
        required_error: '백그라운드 이미지 URL은 필수입니다.',
      })
      .max(255, '백그라운드 이미지 URL은 255글자 미만이어야 합니다.')
      .startsWith('https://', '백그라운드 이미지 URL은 https://로 시작되어야 합니다.'),
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
</script>

<template>
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
    />
    <TextField
      label="아티스트 백그라운드 이미지 URL"
      placeholder="https://image.com/background-image.png"
      v-model="backgroundImageUrlField.value.value"
      :error-messages="backgroundImageUrlField.errorMessage.value"
    />
  </CreateForm>
</template>
