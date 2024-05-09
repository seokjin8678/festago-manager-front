<script setup lang="ts">

import Toast from '@/utils/Toast.ts';
import { useField, useForm } from 'vee-validate';
import { OwnerType } from '@/type/socialmedia/OwnerType.ts';
import { SocialMediaType } from '@/type/socialmedia/SocialMediaType.ts';
import FestagoError from '@/api/FestagoError.ts';
import { useRoute } from 'vue-router';
import AdminSocialMediaService from '@/api/admin/AdminSocialMediaService.ts';
import CreateForm from '@/components/form/CreateForm.vue';
import SelectField from '@/components/form/textfield/SelectField.vue';
import TextField from '@/components/form/textfield/TextField.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { object } from 'zod';
import FormValidator from '@/utils/FormValidator.ts';

type CreateArtistSocialMediaForm = {
  socialMediaType: SocialMediaType,
  name: string,
  logoUrl: string,
  url: string,
}

const route = useRoute();
const { isSubmitting, handleSubmit, setErrors, handleReset } = useForm<CreateArtistSocialMediaForm>({
  validationSchema: toTypedSchema(
    object({
      socialMediaType: FormValidator.SocialMedia.socialMediaType,
      name: FormValidator.SocialMedia.name,
      logoUrl: FormValidator.SocialMedia.logoUrl.optional(),
      url: FormValidator.SocialMedia.url,
    }),
  ),
});

const socialMediaTypeField = useField<SocialMediaType>('socialMediaType');
const nameField = useField<string>('name');
const logoUrlField = useField<string>('logoUrl');
const urlField = useField<string>('url');

const onSubmit = handleSubmit(async form => {
  try {
    await AdminSocialMediaService.createSocialMedia({
      ownerId: parseInt(route.params.id as string),
      ownerType: OwnerType.ARTIST,
      socialMediaType: form.socialMediaType,
      name: form.name,
      logoUrl: form.logoUrl,
      url: form.url,
    });
    handleReset();
    Toast.success('소셜미디어가 생성되었습니다!');
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
    form-title="아티스트 소셜미디어 추가"
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
