<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { AuthType } from '@/type/AuthType.ts';

const authStore = useAuthStore();
</script>

<template>
  <v-list-item>
    <div class="my-2 text-center">
      <p class="text-h6">
        {{ authStore.username }}
      </p>
    </div>
    <v-divider />
    <v-list density="compact" :nav="true">
      <v-list-item prepend-icon="mdi-home-city" title="홈" @click="$router.push('/')" />
      <v-list-item prepend-icon="mdi-shield-crown-outline" title="루트 어드민 관리" @click="$router.push('/root')"
                   v-if="authStore.authType === AuthType.ROOT" />
      <v-list-item prepend-icon="mdi-account" title="내 정보" @click="$router.push('/admin/my-page')" />
      <v-list-item prepend-icon="mdi-town-hall" title="학교 관리" @click="$router.push('/admin/school')" />
    </v-list>
  </v-list-item>
</template>
