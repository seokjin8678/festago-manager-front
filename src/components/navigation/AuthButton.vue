<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { router } from '@/router';
import AuthService from '@/api/auth/AuthService.ts';

const authStore = useAuthStore();

async function logout() {
  await AuthService.logout();
  authStore.logout();
  await router.push('/login');
}
</script>

<template>
  <v-btn prepend-icon="mdi-login" v-if="!authStore.isLogin" @click="$router.push('/login')">
    로그인
  </v-btn>
  <v-btn prepend-icon="mdi-logout" v-else @click="logout">
    로그아웃
  </v-btn>
</template>
