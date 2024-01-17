<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { ref } from 'vue';
import { router } from '@/router';
import AuthService from '@/api/auth/AuthService.ts';
import ApiService from '@/api';
import FestagoError from '@/api/FestagoError.ts';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { useField, useForm } from 'vee-validate';
import RouterPath from '@/router/RouterPath.ts';
import { LoginRequest } from '@/api/spec/auth/LoginApiSpec.ts';

const authStore = useAuthStore();
const snackbarStore = useSnackbarStore();
const { handleSubmit, handleReset } = useForm<LoginRequest>({
  validationSchema: {
    username(value: string) {
      if (!value) return '계정은 필수입니다.';
      return true;
    },
    password(value: string) {
      if (!value) return '비밀번호는 필수입니다.';
      return true;
    },
  },
});
const usernameField = useField('username');
const passwordField = useField('password');
const invalidForm = ref(false);
const loading = ref(false);
const passwordVisible = ref(false);

const onSubmit = handleSubmit(request => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  AuthService.login(request).then(response => {
    handleReset();
    const { accessToken, username, authType } = response.data;
    ApiService.changeAccessToken(accessToken);
    authStore.login({ accessToken, username, authType });
    router.push(RouterPath.Common.HomePage.path);
    snackbarStore.showSuccess(`${username}님, 환영합니다!`);
  }).catch(e => {
    if (e instanceof FestagoError) {
      usernameField.setErrors(e.message);
      passwordField.setErrors(e.message);
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
    <v-card-title>
      <p class="text-h4 text-center">
        로그인
      </p>
    </v-card-title>
    <v-form
      v-model="invalidForm"
      @submit.prevent="onSubmit"
    >
      <p class="text-subtitle-1 text-medium-emphasis">
        계정
      </p>
      <v-text-field
        v-model="usernameField.value.value"
        :error-messages="usernameField.errorMessage.value"
        density="compact"
        placeholder="ID를 입력해주세요."
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        maxlength="50"
      />
      <p class="text-subtitle-1 text-medium-emphasis mt-1">
        비밀번호
      </p>
      <v-text-field
        v-model="passwordField.value.value"
        :error-messages="passwordField.errorMessage.value"
        :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="passwordVisible ? 'text' : 'password'"
        density="compact"
        placeholder="비밀번호를 입력해주세요."
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        maxlength="50"
        @click:append-inner="passwordVisible = !passwordVisible"
      />
      <v-btn
        :disabled="!invalidForm"
        :loading="loading"
        :block="true"
        class="my-4"
        color="blue"
        size="large"
        type="submit"
        text="로그인"
      />
    </v-form>
  </v-card>
</template>
