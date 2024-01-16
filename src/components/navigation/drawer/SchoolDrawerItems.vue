<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore.ts';
import RouterPath from '@/router/RouterPath.ts';

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
      <v-list-item
        prepend-icon="mdi-home-city"
        title="홈"
        @click="$router.push(RouterPath.Common.HomePage.path)"
      />
      <v-list-item
        prepend-icon="mdi-account-group-outline"
        title="축제 관리"
        @click="$router.push(RouterPath.School.SchoolFestivalManagePage.path)"
      />
    </v-list>
  </v-list-item>
</template>
