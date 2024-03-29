<script setup lang="ts">

import { useRoute } from 'vue-router';
import EditForm from '@/components/form/EditForm.vue';
import { onMounted, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import AdminFestivalService from '@/api/admin/AdminFestivalService.ts';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import RouterPath from '@/router/RouterPath.ts';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { UpdateFestivalRequest } from '@/api/spec/festival/UpdateFestivalApiSpec.ts';

const route = useRoute();
const snackbarStore = useSnackbarStore();

onMounted(() => {
  festivalId.value = parseInt(route.params.id as string);
  AdminFestivalService.fetchOneFestival(festivalId.value).then(response => {
    const result = response.data;
    schoolName.value = result.schoolName;
    resetForm({ values: result });
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminFestivalManageListPage.path);
      snackbarStore.showError('해당 축제를 찾을 수 없습니다.');
    } else throw e;
  });
});

const { isSubmitting, meta, resetForm, setErrors, handleSubmit } = useForm<UpdateFestivalRequest>({
  validationSchema: {
    name(value: string) {
      if (!value) return '축제 이름은 필수입니다.';
      if (value.length < 5) return '축제 이름은 5글자 이상이어야 합니다.';
      return true;
    },
    startDate(value: string) {
      if (!value) return '시작일은 필수입니다.';
      return true;
    },
    endDate(value: string) {
      if (!value) return '종료일은 필수입니다.';
      return true;
    },
    posterImageUrl(value: string) {
      if (!value) return '포스터 이미지 URL은 필수입니다.';
      if (value.length >= 255) return '포스터 이미지 URL은 255글자 미만이어야 합니다.';
      if (!value.startsWith('https://')) return '포스터 이미지 URL은 https://로 시작되어야 합니다.';
      if (!/\.(png|jpg)$/.test(value)) return '포스터 이미지 URL은 png,jpg와 같은 이미지 파일으로 끝나야 합니다.';
      return true;
    },
  },
});

const festivalId = ref<number>();
const schoolName = ref<string>();
const nameField = useField('name');
const startDateField = useField('startDate');
const endDateField = useField('endDate');
const posterImageUrlField = useField('posterImageUrl');

const onUpdateSubmit = handleSubmit(async request => {
  try {
    await AdminFestivalService.updateFestival(festivalId.value!, request);
    snackbarStore.showSuccess('축제가 수정되었습니다.');
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
  AdminFestivalService.deleteFestival(festivalId.value!).then(() => {
    snackbarStore.showSuccess('축제가 삭제되었습니다.');
    router.push(RouterPath.Admin.AdminFestivalManageListPage.path);
  }).catch(e => {
    if (e instanceof FestagoError) {
      snackbarStore.showError(e.message);
    } else throw e;
  });

}
</script>

<template>
  <EditForm
    form-title="축제 수정/삭제"
    :on-update-submit="onUpdateSubmit"
    :on-delete-submit="onDeleteSubmit"
    :loading="isSubmitting"
    :is-touched="meta.dirty"
  >
    <v-text-field
      class="mb-3"
      variant="outlined"
      label="ID"
      :model-value="festivalId"
      :readonly="true"
    />
    <v-text-field
      class="mb-3"
      variant="outlined"
      label="학교"
      :model-value="schoolName"
      :readonly="true"
    />
    <v-text-field
      class="mb-3"
      v-model="nameField.value.value"
      :error-messages="nameField.errorMessage.value"
      variant="outlined"
      label="이름"
    />
    <v-text-field
      class="mb-3"
      type="date"
      v-model="startDateField.value.value"
      :error-messages="startDateField.errorMessage.value"
      variant="outlined"
      label="축제 시작일"
    />
    <v-text-field
      class="mb-3"
      type="date"
      v-model="endDateField.value.value"
      :error-messages="endDateField.errorMessage.value"
      variant="outlined"
      label="축제 종료일"
    />
    <v-text-field
      class="mb-3"
      v-model="posterImageUrlField.value.value"
      :error-messages="posterImageUrlField.errorMessage.value"
      placeholder="https://image.com/festival-poseter.png"
      variant="outlined"
      label="축제 포스터 이미지 URL"
    />
  </EditForm>
</template>
