<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import AdminSchoolService from '@/api/admin/AdminSchoolService.ts';
import Toast from '@/utils/Toast.ts';
import FestagoError from '@/api/FestagoError.ts';
import { CreateSchoolRequest } from '@/api/spec/school/CreateSchoolApiSpec.ts';
import CreateForm from '@/components/form/CreateForm.vue';
import { Region } from '@/type/school/Region.ts';
import SelectField from '@/components/form/textfield/SelectField.vue';
import TextField from '@/components/form/textfield/TextField.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { object } from 'zod';
import { ref } from 'vue';
import ImageUploadDialog from '@/components/dialog/ImageUploadDialog.vue';
import FormValidator from '@/utils/FormValidator.ts';

const { isSubmitting, handleSubmit, setErrors, handleReset } = useForm<CreateSchoolRequest>({
  validationSchema: toTypedSchema(
    object({
      name: FormValidator.School.name,
      domain: FormValidator.School.domain,
      logoUrl: FormValidator.School.logoUrl.optional(),
      backgroundImageUrl: FormValidator.School.backgroundImageUrl.optional(),
      region: FormValidator.School.region,
    }),
  ),
});
const nameField = useField<string>('name');
const domainField = useField<string>('domain');
const regionField = useField<string>('region');
const logoUrlField = useField<string>('logoUrl');
const backgroundImageUrlField = useField<string>('backgroundImageUrl');

const showImageUploadDialog = ref(false);
const uploadDialogTitle = ref('');
const uploadCallback = ref((_: string) => {
});

function uploadLogoImage() {
  showImageUploadDialog.value = true;
  uploadDialogTitle.value = '로고 이미지 업로드';
  uploadCallback.value = uploadUri => {
    logoUrlField.value.value = uploadUri;
  };
}

function uploadBackgroundImage() {
  showImageUploadDialog.value = true;
  uploadDialogTitle.value = '백그라운드 이미지 업로드';
  uploadCallback.value = uploadUri => {
    backgroundImageUrlField.value.value = uploadUri;
  };
}

const onSubmit = handleSubmit(async request => {
  try {
    await AdminSchoolService.createSchool(request);
    handleReset();
    Toast.success('학교가 생성되었습니다!');
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
  <ImageUploadDialog
    v-model="showImageUploadDialog"
    :title="uploadDialogTitle"
    @upload-callback="uploadCallback"
  />
  <CreateForm
    :on-submit="onSubmit"
    form-title="학교 추가"
    :loading="isSubmitting"
  >
    <TextField
      label="대학교 이름"
      v-model="nameField.value.value"
      :error-messages="nameField.errorMessage.value"
      placeholder="XX대학교"
    />
    <TextField
      label="학교 도메인"
      v-model="domainField.value.value"
      :error-messages="domainField.errorMessage.value"
      placeholder="school.ac.kr"
    />
    <TextField
      label="로고 URL (선택)"
      v-model="logoUrlField.value.value"
      :error-messages="logoUrlField.errorMessage.value"
      placeholder="https://image.com/logo.png"
      :readonly="true"
      @click="uploadLogoImage"
    />
    <TextField
      label="백그라운드 이미지 URL (선택)"
      v-model="backgroundImageUrlField.value.value"
      :error-messages="backgroundImageUrlField.errorMessage.value"
      placeholder="https://image.com/backgroundImage.png"
      :readonly="true"
      @click="uploadBackgroundImage"
    />
    <SelectField
      label="지역"
      :items="Object.values(Region)"
      v-model="regionField.value.value"
      :error-messages="regionField.errorMessage.value"
    />
  </CreateForm>
</template>
