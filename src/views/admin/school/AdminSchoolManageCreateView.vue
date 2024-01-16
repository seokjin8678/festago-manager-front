<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import AdminSchoolService from '@/api/admin/AdminSchoolService.ts';
import { ref } from 'vue';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import FestagoError from '@/api/FestagoError.ts';
import { CreateSchoolRequest } from '@/api/spec/school/CreateSchoolApiSpec.ts';

const snackbarStore = useSnackbarStore();
const { handleSubmit, handleReset } = useForm<CreateSchoolRequest>({
  validationSchema: {
    name(value: string) {
      if (!value) return '대학교 이름은 필수입니다.';
      if (value.length < 5) return '대학교의 이름은 5글자 이상이어야 합니다.';
      if (!value.endsWith("학교")) return '대학교의 이름은 "학교"로 끝나야 합니다.';
      return true;
    },
    domain(value: string) {
      if (!value) return '도메인은 필수입니다.';
      if (value.length < 5) return '도메인은 5글자 이상이어야 합니다.';
      if (!/^[^.].*\..+$/.test(value)) return '도메인의 형식은 school.ac.kr과 같아야 합니다.';
      if (!/^[a-zA-Z.]+$/.test(value)) return '도메인은 영문으로만 구성되어야 합니다.';
      return true;
    },
  },
});
const nameField = useField('name');
const domainField = useField('domain');
const invalidForm = ref(false);
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
      snackbarStore.showError(e.message);
    } else throw e;
  });
});
</script>

<template>
  <v-card
    class="mx-auto pa-3 pa-md-15 py-8 mt-16 w-75"
    max-width="800"
    min-width="350"
    elevation="4"
  >
    <v-card-title class="mb-3">
      <p class="text-h4 text-center">
        학교 추가
      </p>
    </v-card-title>
    <v-form
      v-model="invalidForm"
      @submit.prevent="onSubmit"
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
      <v-btn
        :disabled="!invalidForm"
        :loading="loading"
        class="text-h6"
        type="submit"
        text="생성"
        color="blue"
        :block="true"
      />
    </v-form>
  </v-card>
</template>
