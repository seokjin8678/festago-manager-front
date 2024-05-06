<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { ref } from 'vue';
import { router } from '@/router';
import AuthService from '@/api/auth/AuthService.ts';
import FestagoError from '@/api/FestagoError.ts';
import Toast from '@/utils/Toast.ts';
import { useField, useForm } from 'vee-validate';
import RouterPath from '@/router/RouterPath.ts';
import { LoginRequest } from '@/api/spec/auth/LoginApiSpec.ts';
import TextField from '@/components/form/textfield/TextField.vue';
import PasswordField from '@/components/form/textfield/PasswordField.vue';

const authStore = useAuthStore();
const { isSubmitting, handleSubmit, handleReset } = useForm<LoginRequest>({
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
const usernameField = useField<string>('username');
const passwordField = useField<string>('password');
const invalidForm = ref(false);

const onSubmit = handleSubmit(async request => {
  try {
    const response = await AuthService.login(request);
    handleReset();
    const { username, authType } = response.data;
    authStore.login({ username, authType });

    await router.push(RouterPath.Common.HomeView.path);
    Toast.success(`${username}님, 환영합니다!`);
  } catch (e) {
    if (e instanceof FestagoError) {
      usernameField.setErrors(e.message);
      passwordField.setErrors(e.message);
    } else throw e;
  }
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
      <p class="text-subtitle-1 text-medium-emphasis">계정</p>
      <TextField
        label=""
        v-model="usernameField.value.value"
        :error-messages="usernameField.errorMessage.value"
        prepend-inner-icon="mdi-account-outline"
        placeholder="ID를 입력해주세요."
      />

      <p class="text-subtitle-1 text-medium-emphasis mt-1">비밀번호</p>
      <PasswordField
        label=""
        v-model="passwordField.value.value"
        :error-messages="passwordField.errorMessage.value"
        prepend-inner-icon="mdi-lock-outline"
        placeholder="비밀번호를 입력해주세요."
      />

      <v-btn
        :disabled="!invalidForm"
        :loading="isSubmitting"
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
