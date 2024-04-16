<script setup lang="ts">

import { useRoute } from 'vue-router';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
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

const route = useRoute();
const snackbarStore = useSnackbarStore();

onMounted(() => {
  socialMediaId.value = parseInt(route.params.id as string);
  AdminSocialMediaService.fetchOneSocialMedia(socialMediaId.value).then(response => {
    socialMedia.value = response.data;
    resetForm({ values: response.data });
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminSchoolManageListView.path);
      snackbarStore.showError('해당 소셜미디어를 찾을 수 없습니다.');
    } else throw e;
  });
});

const { isSubmitting, meta, resetForm, setErrors, handleSubmit } = useForm<UpdateSocialMediaRequest>({
  validationSchema: {
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

const socialMediaId = ref<number>();
const socialMedia = ref<FetchOneSocialMediaResponse>();
const nameField = useField<string>('name');
const logoUrlField = useField<string>('logoUrl');
const urlField = useField<string>('url');

const onUpdateSubmit = handleSubmit(async request => {
  try {
    await AdminSocialMediaService.updateSocialMedia(socialMediaId.value!, request);
    snackbarStore.showSuccess('소셜미디어가 수정되었습니다.');
    resetForm({ values: request });
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

function onDeleteSubmit() {
  AdminSocialMediaService.deleteSocialMedia(socialMediaId.value!).then(() => {
    snackbarStore.showSuccess('소셜미디어가 삭제되었습니다.');
    router.back();
  }).catch(e => {
    if (e instanceof FestagoError) {
      snackbarStore.showError(e.message);
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
