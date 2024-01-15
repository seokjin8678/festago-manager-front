<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { ref } from 'vue';
import { router } from '@/router';
import AuthService from '@/api/auth/AuthService.ts';
import ApiService from '@/api';
import FestagoError from '@/api/FestagoError.ts';

const authStore = useAuthStore();
const visible = ref(false);
const loginInput = ref({
  username: '',
  password: '',
});
const errorMessage = ref('');
const loading = ref(false);
const form = ref(false);
const rules = ref({
  required: (value: any) => !!value,
});

function onSubmit() {
  form.value = false;
  loading.value = true;
  setTimeout(() => (form.value = true), 1000);
  AuthService.login(loginInput.value.username, loginInput.value.password).then(response => {
    ApiService.changeAccessToken(response.data.accessToken);
    authStore.login(response.data);
    router.push('/');
  }).catch(e => {
    if (e instanceof FestagoError) {
      loading.value = false;
      errorMessage.value = e.message;
    } else throw e;
  });
}
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
      v-model="form"
      @submit.prevent="onSubmit"
    >
      <p class="text-subtitle-1 text-medium-emphasis">
        계정
      </p>
      <v-text-field
        ref="qqc"
        density="compact"
        placeholder="ID를 입력해주세요."
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        maxlength="50"
        v-model="loginInput.username"
        :rules="[rules.required]"
        :hide-details="true"
      />
      <span v-if="errorMessage" class="text-subtitle-2 text-red-darken-3">
        {{ errorMessage }}
      </span>
      <p class="text-subtitle-1 text-medium-emphasis mt-1">
        비밀번호
      </p>
      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="비밀번호를 입력해주세요."
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        maxlength="50"
        v-model="loginInput.password"
        :rules="[rules.required]"
        @click:append-inner="visible = !visible"
        :hide-details="true"
      />
      <span v-if="errorMessage" class="text-subtitle-2 text-red-darken-3">
        {{ errorMessage }}
      </span>
      <v-btn
        :disabled="!form"
        :loading="loading"
        :block="true"
        class="my-4"
        color="blue"
        size="large"
        type="submit"
      >
        로그인
      </v-btn>
    </v-form>
  </v-card>
</template>
