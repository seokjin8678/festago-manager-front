<script setup lang="ts">

import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { useField, useForm } from 'vee-validate';
import { OwnerType } from '@/type/socialmedia/OwnerType.ts';
import { SocialMediaType } from '@/type/socialmedia/SocialMediaType.ts';
import FestagoError from '@/api/FestagoError.ts';
import { useRoute } from 'vue-router';
import AdminSocialMediaService from '@/api/admin/AdminSocialMediaService.ts';
import CreateForm from '@/components/form/CreateForm.vue';
import SelectField from '@/components/form/textfield/SelectField.vue';
import TextField from '@/components/form/textfield/TextField.vue';

type CreateSchoolSocialMediaForm = {
  socialMediaType: SocialMediaType,
  name: string,
  logoUrl: string,
  url: string,
}

const route = useRoute();
const snackbarStore = useSnackbarStore();
const { isSubmitting, handleSubmit, setErrors, handleReset } = useForm<CreateSchoolSocialMediaForm>({
  validationSchema: {
    socialMediaType(value: string) {
      if (!value) return '소셜미디어 타입은 필수입니다.';
      return true;
    },
    name(value: string) {
      if (!value) return '소셜미디어 이름은 필수입니다.';
      return true;
    },
    logoUrl(value: string) {
      if (!value) return '로고 URL은 필수입니다.';
      if (value.length >= 255) return '로고 URL은 255글자 미만이어야 합니다.';
      if (!value.startsWith('https://')) return '로고 URL은 https://로 시작되어야 합니다.';
      if (!/\.(png|jpg)$/.test(value)) return '로고 URL은 png,jpg와 같은 이미지 파일으로 끝나야 합니다.';
      return true;
    },
    url(value: string) {
      if (!value) return 'URL은 필수입니다.';
      if (value.length >= 255) return 'URL은 255글자 미만이어야 합니다.';
      if (!value.startsWith('https://')) return 'URL은 https://로 시작되어야 합니다.';
      return true;
    },
  },
});

const socialMediaTypeField = useField<SocialMediaType>('socialMediaType');
const nameField = useField<string>('name');
const logoUrlField = useField<string>('logoUrl');
const urlField = useField<string>('url');

const onSubmit = handleSubmit(async form => {
  try {
    await AdminSocialMediaService.createSocialMedia({
      ownerId: parseInt(route.params.id as string),
      ownerType: OwnerType.SCHOOL,
      socialMediaType: form.socialMediaType,
      name: form.name,
      logoUrl: form.logoUrl,
      url: form.url,
    });
    handleReset();
    snackbarStore.showSuccess('소셜미디어가 생성되었습니다!');
  } catch (e) {
    if (e instanceof FestagoError) {
      if (e.isValidError()) {
        setErrors(e.result);
      } else {
        snackbarStore.showError(e.message);
      }
    } else throw e;
  }
});

</script>

<template>
  <CreateForm
    :on-submit="onSubmit"
    :loading="isSubmitting"
    form-title="학교 소셜미디어 추가"
  >
    <SelectField
      label="소셜 미디어 타입"
      :items="Object.values(SocialMediaType)"
      v-model="socialMediaTypeField.value.value"
      :error-messages="socialMediaTypeField.errorMessage.value"
    />
    <TextField
      label="이름"
      v-model="nameField.value.value"
      :error-messages="nameField.errorMessage.value"
    />
    <TextField
      label="로고 URL"
      v-model="logoUrlField.value.value"
      :error-messages="logoUrlField.errorMessage.value"
    />
    <TextField
      label="URL"
      v-model="urlField.value.value"
      :error-messages="urlField.errorMessage.value"
    />
  </CreateForm>
</template>
