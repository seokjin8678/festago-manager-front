<script setup lang="ts">

import CreateForm from '@/components/form/CreateForm.vue';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { CreateAdminAccountRequest } from '@/api/spec/admin/CreateAdminAccountApiSpec.ts';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import FestagoError from '@/api/FestagoError.ts';
import RootAdminService from '@/api/admin/RootAdminService.ts';

const snackbarStore = useSnackbarStore();
const { isSubmitting, handleSubmit, handleReset, setErrors } = useForm<CreateAdminAccountRequest>({
  validationSchema: {
    username(value: string) {
      if (!value) return '계정은 필수입니다.';
      if (value.length < 4) return '계정의 길이는 4글자 이상이어야 합니다.';
      return true;
    },
    password(value: string) {
      if (!value) return '비밀번호는 필수입니다.';
      if (value.length < 6) return '비밀번호의 길이는 6글자 이상이어야 합니다.';
      return true;
    },
    confirmPassword(value: string) {
      if (!value) return '비밀번호는 필수입니다.';
      if (value.length < 6) return '비밀번호의 길이는 6글자 이상이어야 합니다.';
      return true;
    },
  },
});

const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);

const usernameField = useField('username');
const passwordField = useField('password');
const confirmPasswordField = useField('confirmPassword');
const onSubmit = handleSubmit(async request => {
  if (passwordField.value.value !== confirmPasswordField.value.value) {
    passwordField.setErrors('비밀번호와 확인 비밀번호가 맞지 않습니다.');
    confirmPasswordField.setErrors('비밀번호와 확인 비밀번호가 맞지 않습니다.');
    return;
  }
  try {
    await RootAdminService.createAdminAccount(request);
    handleReset();
    snackbarStore.showSuccess('어드민 계정이 생성되었습니다.');
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

</script>

<template>
  <CreateForm
    :on-submit="onSubmit"
    :loading="isSubmitting"
    form-title="어드민 계정 생성"
  >
    <v-text-field
      class="mb-3"
      v-model="usernameField.value.value"
      :error-messages="usernameField.errorMessage.value"
      placeholder="계정"
      variant="outlined"
      label="계정"
    />
    <v-text-field
      class="mb-3"
      :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="passwordVisible ? 'text' : 'password'"
      v-model="passwordField.value.value"
      :error-messages="passwordField.errorMessage.value"
      variant="outlined"
      label="비밀번호"
      @click:append-inner="passwordVisible = !passwordVisible"
    />
    <v-text-field
      class="mb-3"
      :append-inner-icon="confirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="confirmPasswordVisible ? 'text' : 'password'"
      v-model="confirmPasswordField.value.value"
      :error-messages="confirmPasswordField.errorMessage.value"
      variant="outlined"
      label="비밀번호 확인"
      @click:append-inner="confirmPasswordVisible = !confirmPasswordVisible"
    />
  </CreateForm>
</template>
