<script setup lang="ts">
import { useDrawerStore } from '@/stores/useDrawerStore.ts';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import AdminDrawerItems from '@/components/navigation/drawer/AdminDrawerItems.vue';
import SchoolDrawerItems from '@/components/navigation/drawer/SchoolDrawerItems.vue';

const drawerStore = useDrawerStore();
const authStore = useAuthStore();
</script>

<template>
  <v-navigation-drawer v-model="drawerStore.isShow" :disable-resize-watcher="true">
    <v-list v-if="!authStore.isLogin">
      <v-list-item prepend-icon="mdi-login" title="로그인이 필요합니다." @click="$router.push('/login')" />
    </v-list>
    <AdminDrawerItems v-else-if="authStore.isAdmin" />
    <SchoolDrawerItems v-else />
  </v-navigation-drawer>
</template>
