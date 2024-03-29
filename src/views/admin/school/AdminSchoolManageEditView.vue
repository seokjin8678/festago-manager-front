<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import AdminSchoolService from '@/api/admin/AdminSchoolService.ts';
import { useRoute } from 'vue-router';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import RouterPath from '@/router/RouterPath.ts';
import { UpdateSchoolRequest } from '@/api/spec/school/UpdateSchoolApiSpec.ts';
import EditForm from '@/components/form/EditForm.vue';

const route = useRoute();
const snackbarStore = useSnackbarStore();

onMounted(() => {
  schoolId.value = parseInt(route.params.id as string);
  AdminSchoolService.fetchOneSchool(schoolId.value).then(response => {
    resetForm({ values: response.data });
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminSchoolManageListPage.path);
      snackbarStore.showError('해당 학교를 찾을 수 없습니다.');
    } else throw e;
  });
});

const { isSubmitting, meta, resetForm, setErrors, handleSubmit } = useForm<UpdateSchoolRequest>({
  validationSchema: {
    name(value: string) {
      if (!value) return '대학교 이름은 필수입니다.';
      return true;
    },
    domain(value: string) {
      if (!value) return '도메인은 필수입니다.';
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

const onUpdateSubmit = handleSubmit(async request => {
  try {
    await AdminSchoolService.updateSchool(schoolId.value!, request);
    snackbarStore.showSuccess('학교가 수정되었습니다.');
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
  AdminSchoolService.deleteSchool(schoolId.value!).then(() => {
    snackbarStore.showSuccess('학교가 삭제되었습니다.');
    router.push(RouterPath.Admin.AdminSchoolManageListPage.path);
  }).catch(e => {
    if (e instanceof FestagoError) {
      snackbarStore.showError(e.message);
    } else throw e;
  });
}

const schoolId = ref<number>();
const nameField = useField<string>('name');
const domainField = useField<string>('domain');
const regionField = useField<string>('region');
const logoUrlField = useField<string>('logoUrl');
const backgroundImageUrlField = useField<string>('backgroundImageUrl');
</script>

<template>
  <EditForm
    form-title="학교 수정/삭제"
    :loading="isSubmitting"
    :on-update-submit="onUpdateSubmit"
    :on-delete-submit="onDeleteSubmit"
    :is-touched="meta.dirty"
  >
    <v-text-field
      class="mb-3"
      variant="outlined"
      label="ID"
      :model-value="schoolId"
      :readonly="true"
    />
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
  </EditForm>
</template>
