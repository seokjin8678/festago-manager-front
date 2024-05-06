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
import ReadonlyField from '@/components/form/textfield/ReadonlyField.vue';
import TextField from '@/components/form/textfield/TextField.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';

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
      router.push(RouterPath.Admin.AdminFestivalManageListView.path);
      snackbarStore.showError('해당 축제를 찾을 수 없습니다.');
    } else throw e;
  });
});

const { isSubmitting, meta, resetForm, setErrors, handleSubmit } = useForm<UpdateFestivalRequest>({
  validationSchema: toTypedSchema(
    object({
      name: string({
        required_error: '축제 이름은 필수입니다.',
      })
      .min(5, '축제 이름은 5글자 이상이어야 합니다.'),
      startDate: string({
        required_error: '시작일은 필수입니다.',
      }),
      endDate: string({
        required_error: '종료일은 필수입니다.',
      }),
      posterImageUrl: string()
      .max(255, '포스터 이미지 URL은 255글자 미만이어야 합니다.')
      .startsWith('https://', '포스터 이미지 URL은 https://로 시작되어야 합니다.')
      .optional(),
    }),
  ),
});

const festivalId = ref<number>();
const schoolName = ref<string>();
const nameField = useField<string>('name');
const startDateField = useField<string>('startDate');
const endDateField = useField<string>('endDate');
const posterImageUrlField = useField<string>('posterImageUrl');

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
    router.push(RouterPath.Admin.AdminFestivalManageListView.path);
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
    <ReadonlyField label="ID" :value="festivalId" />
    <ReadonlyField label="학교" :value="schoolName" />
    <TextField
      label="축제 이름"
      placeholder="축제 이름"
      v-model="nameField.value.value"
      :error-messages="nameField.errorMessage.value"
    />
    <TextField
      label="축제 시작일"
      type="date"
      v-model="startDateField.value.value"
      :error-messages="startDateField.errorMessage.value"
    />
    <TextField
      label="축제 종료일"
      type="date"
      v-model="endDateField.value.value"
      :error-messages="endDateField.errorMessage.value"
    />
    <TextField
      label="축제 포스터 이미지 URL"
      placeholder="https://image.com/festival-poseter.png"
      v-model="posterImageUrlField.value.value"
      :error-messages="posterImageUrlField.errorMessage.value"
    />
  </EditForm>
</template>
