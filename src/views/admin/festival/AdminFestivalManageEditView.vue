<script setup lang="ts">

import { useRoute } from 'vue-router';
import EditForm from '@/components/form/EditForm.vue';
import { onMounted, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import AdminFestivalService from '@/api/admin/AdminFestivalService.ts';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import RouterPath from '@/router/RouterPath.ts';
import Toast from '@/utils/Toast.ts';
import { UpdateFestivalRequest } from '@/api/spec/festival/UpdateFestivalApiSpec.ts';
import ReadonlyField from '@/components/form/textfield/ReadonlyField.vue';
import TextField from '@/components/form/textfield/TextField.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { object } from 'zod';
import ImageUploadDialog from '@/components/dialog/ImageUploadDialog.vue';
import FormValidator from '@/utils/FormValidator.ts';

const route = useRoute();

onMounted(() => {
  festivalId.value = parseInt(route.params.id as string);
  AdminFestivalService.fetchOneFestival(festivalId.value).then(response => {
    const result = response.data;
    schoolName.value = result.schoolName;
    resetForm({ values: result });
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminFestivalManageListView.path);
      Toast.error('해당 축제를 찾을 수 없습니다.');
    } else throw e;
  });
});

const { isSubmitting, meta, resetForm, setErrors, handleSubmit } = useForm<UpdateFestivalRequest>({
  validationSchema: toTypedSchema(
    object({
      name: FormValidator.Festival.name,
      startDate: FormValidator.Festival.startDate,
      endDate: FormValidator.Festival.endDate,
      posterImageUrl: FormValidator.Festival.posterImageUrl.optional(),
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
    Toast.success('축제가 수정되었습니다.');
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
  AdminFestivalService.deleteFestival(festivalId.value!).then(() => {
    Toast.success('축제가 삭제되었습니다.');
    router.push(RouterPath.Admin.AdminFestivalManageListView.path);
  }).catch(e => {
    if (e instanceof FestagoError) {
      Toast.error(e.message);
    } else throw e;
  });
}

const showImageUploadDialog = ref(false);
const uploadDialogTitle = ref('');
const uploadCallback = ref((_: string) => {
});

function uploadPosterImage() {
  showImageUploadDialog.value = true;
  uploadDialogTitle.value = '포스터 이미지 업로드';
  uploadCallback.value = uploadUri => {
    posterImageUrlField.value.value = uploadUri;
  };
}

</script>

<template>
  <ImageUploadDialog
    v-model="showImageUploadDialog"
    :title="uploadDialogTitle"
    @upload-callback="uploadCallback"
    :owner-id="festivalId"
    owner-type="FESTIVAL"
  />
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
      :readonly="true"
      @click="uploadPosterImage"
    />
  </EditForm>
</template>
