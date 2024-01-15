<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { AuthType } from '@/type/AuthType.ts';
import { ref } from 'vue';

const authStore = useAuthStore();
const menus = ref([]);
</script>

<template>
  <div class="my-2 text-center">
    <p class="text-h6">
      {{ authStore.username }}
    </p>
  </div>
  <v-divider />
  <v-list density="compact" :nav="true" v-model:opened="menus">
    <v-list-item prepend-icon="mdi-home-city" title="홈" @click="$router.push('/')" />
    <v-list-item prepend-icon="mdi-shield-crown-outline" title="루트 어드민 관리" @click="$router.push('/root')"
                 v-if="authStore.authType === AuthType.ROOT" />
    <v-list-item prepend-icon="mdi-account" title="내 정보" @click="$router.push('/admin/my-page')" />
    <v-list-group value="학교관리">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-town-hall"
          title="학교 관리"
        ></v-list-item>
      </template>
      <v-list-item
        title="학교 추가"
        @click="$router.push('/admin/school/create')"
      />
      <v-list-item
        title="학교 목록"
        @click="$router.push('/admin/school')"
      />
    </v-list-group>
  </v-list>
</template>
