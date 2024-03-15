<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import AdminSchoolService from '@/api/admin/AdminSchoolService.ts';
import { ref } from 'vue';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import FestagoError from '@/api/FestagoError.ts';
import { CreateSchoolRequest } from '@/api/spec/school/CreateSchoolApiSpec.ts';
import CreateForm from '@/components/form/CreateForm.vue';

const snackbarStore = useSnackbarStore();
const { handleSubmit, setErrors, handleReset } = useForm<CreateSchoolRequest>({
  validationSchema: {
    name(value: string) {
      if (!value) return '대학교 이름은 필수입니다.';
      if (value.length < 5) return '대학교의 이름은 5글자 이상이어야 합니다.';
      if (!value.endsWith('학교')) return '대학교의 이름은 "학교"로 끝나야 합니다.';
      return true;
    },
    domain(value: string) {
      if (!value) return '도메인은 필수입니다.';
      if (value.length < 5) return '도메인은 5글자 이상이어야 합니다.';
      if (!/^[^.].*\..+$/.test(value)) return '도메인의 형식은 school.ac.kr과 같아야 합니다.';
      if (!/^[a-zA-Z.]+$/.test(value)) return '도메인은 영문으로만 구성되어야 합니다.';
      return true;
    },
    logoUrl(value: string) {
      if (value) {
        if (value.length >= 255) return '로고 URL은 255글자 미만이어야 합니다.';
        if (!value.startsWith('https://')) return '로고 URL은 https://로 시작되어야 합니다.';
        if (!/\.(png|jpg)$/.test(value)) return '로고 URL은 png,jpg와 같은 이미지 파일으로 끝나야 합니다.';
      }
      return true;
    },
    backgroundImageUrl(value: string) {
      if (value) {
        if (value.length >= 255) return '백그라운드 이미지 URL은 255글자 미만이어야 합니다.';
        if (!value.startsWith('https://')) return '백그라운드 이미지 URL은 https://로 시작되어야 합니다.';
        if (!/\.(png|jpg)$/.test(value)) return '백그라운드 이미지 URL은 png,jpg와 같은 이미지 파일으로 끝나야 합니다.';
      }
      return true;
    },
    region(value: string) {
      if (!value) return '지역은 필수입니다.';
      return true;
    },
  },
});
const nameField = useField<string>('name');
const domainField = useField<string>('domain');
const regionField = useField<string>('region');
const logoUrlField = useField<string>('logoUrl');
const backgroundImageUrlField = useField<string>('backgroundImageUrl');
const loading = ref(false);

const onSubmit = handleSubmit(request => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  AdminSchoolService.createSchool(request).then(() => {
    handleReset();
    loading.value = false;
    snackbarStore.showSuccess('학교가 생성되었습니다!');
  }).catch(e => {
    if (e instanceof FestagoError) {
      if (e.isValidError()) {
        setErrors(e.result);
      } else {
        snackbarStore.showError(e.message);
      }
    } else throw e;
  });
});
</script>

<template>
  <CreateForm
    :on-submit="onSubmit"
    form-title="학교 추가"
    :loading="loading"
  >
    <v-text-field
      class="mb-3"
      v-model="nameField.value.value"
      :error-messages="nameField.errorMessage.value"
      placeholder="XX대학교"
      variant="outlined"
      label="대학교 이름"
    />
    <v-text-field
      class="mb-3"
      v-model="domainField.value.value"
      :error-messages="domainField.errorMessage.value"
      placeholder="school.ac.kr"
      variant="outlined"
      label="학교 도메인"
    />
    <v-text-field
      class="mb-3"
      v-model="logoUrlField.value.value"
      :error-messages="logoUrlField.errorMessage.value"
      placeholder="https://image.com/logo.png"
      variant="outlined"
      label="로고 URL (선택)"
    />
    <v-text-field
      class="mb-3"
      v-model="backgroundImageUrlField.value.value"
      :error-messages="backgroundImageUrlField.errorMessage.value"
      placeholder="https://image.com/backgroundImage.png"
      variant="outlined"
      label="백그라운드 이미지 URL (선택)"
    />
    <v-select
      class="mb-3"
      v-model="regionField.value.value"
      :error-messages="regionField.errorMessage.value"
      :items="['서울', '대구', '부산', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주']"
      variant="outlined"
      label="지역"
    />
  </CreateForm>
</template>
