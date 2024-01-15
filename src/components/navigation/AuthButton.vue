<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { router } from '@/router';
import AuthService from '@/api/auth/AuthService.ts';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';

const authStore = useAuthStore();
const snackbarStore = useSnackbarStore();

function logout() {
  AuthService.logout().then(() => {
    authStore.logout();
    router.push('/login');
    snackbarStore.showSuccess('로그아웃 되었습니다.')
  });
}
</script>

<template>
  <v-btn
    v-if="!authStore.isLogin"
    class="text-button"
    prepend-icon="mdi-login"
    @click="$router.push('/login')"
  >
    로그인
  </v-btn>
  <v-btn
    v-else
    class="text-button"
    prepend-icon="mdi-logout"
    @click="logout"
  >
    로그아웃
  </v-btn>
</template>
