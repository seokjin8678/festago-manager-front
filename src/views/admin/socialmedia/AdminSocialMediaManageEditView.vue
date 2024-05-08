<script setup lang="ts">

import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import RouterPath from '@/router/RouterPath.ts';
import { useField, useForm } from 'vee-validate';
import AdminSocialMediaService from '@/api/admin/AdminSocialMediaService.ts';
import { UpdateSocialMediaRequest } from '@/api/spec/socialmedia/UpdateSocialMediaApiSpec.ts';
import EditForm from '@/components/form/EditForm.vue';
import { FetchOneSocialMediaResponse } from '@/api/spec/socialmedia/FetchOneSocialMediaApiSpec.ts';
import ReadonlyField from '@/components/form/textfield/ReadonlyField.vue';
import TextField from '@/components/form/textfield/TextField.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';
import Toast from '@/utils/Toast.ts';

const route = useRoute();

onMounted(() => {
  socialMediaId.value = parseInt(route.params.id as string);
  AdminSocialMediaService.fetchOneSocialMedia(socialMediaId.value).then(response => {
    socialMedia.value = response.data;
    resetForm({ values: response.data });
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminSchoolManageListView.path);
      Toast.error('해당 소셜미디어를 찾을 수 없습니다.');
    } else throw e;
  });
});

const { isSubmitting, meta, resetForm, setErrors, handleSubmit } = useForm<UpdateSocialMediaRequest>({
  validationSchema: toTypedSchema(
    object({
      name: string({
        required_error: '소셜미디어 이름은 필수입니다.',
      }),
      logoUrl: string()
      .max(255, '로고 URL은 255글자 미만이어야 합니다.')
      .startsWith('https://', '로고 URL은 https://로 시작되어야 합니다.')
      .optional(),
      url: string({
        required_error: 'URL은 필수입니다.',
      })
      .max(255, 'URL은 255글자 미만이어야 합니다.')
      .startsWith('https://', 'URL은 https://로 시작되어야 합니다.'),
    }),
  ),
});

const socialMediaId = ref<number>();
const socialMedia = ref<FetchOneSocialMediaResponse>();
const nameField = useField<string>('name');
const logoUrlField = useField<string>('logoUrl');
const urlField = useField<string>('url');

const onUpdateSubmit = handleSubmit(async request => {
  try {
    await AdminSocialMediaService.updateSocialMedia(socialMediaId.value!, request);
    Toast.success('소셜미디어가 수정되었습니다.');
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
  AdminSocialMediaService.deleteSocialMedia(socialMediaId.value!).then(() => {
    Toast.success('소셜미디어가 삭제되었습니다.');
    router.back();
  }).catch(e => {
    if (e instanceof FestagoError) {
      Toast.error(e.message);
    } else throw e;
  });
}

</script>

<template>
  <EditForm
    form-title="소셜미디어 수정/삭제"
    :loading="isSubmitting"
    :on-update-submit="onUpdateSubmit"
    :on-delete-submit="onDeleteSubmit"
    :is-touched="meta.dirty"
  >
    <ReadonlyField label="ID" :value="socialMediaId" />
    <ReadonlyField label="Owner ID" :value="socialMedia?.ownerId" />
    <ReadonlyField label="Owner type" :value="socialMedia?.ownerType" />
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
  </EditForm>
</template>
