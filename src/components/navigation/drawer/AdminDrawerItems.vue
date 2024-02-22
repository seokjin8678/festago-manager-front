<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { AuthType } from '@/type/AuthType.ts';
import { ref } from 'vue';
import RouterPath from '@/router/RouterPath.ts';

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
    <v-list-item
      prepend-icon="mdi-home-city"
      title="홈"
      @click="$router.push(RouterPath.Common.HomePage.path)"
    />
    <v-list-item
      prepend-icon="mdi-shield-crown-outline"
      title="루트 어드민 관리"
      @click="$router.push(RouterPath.Admin.RootAdminPage.path)"
      v-if="authStore.authType === AuthType.ROOT"
    />
    <v-list-item
      prepend-icon="mdi-account"
      title="내 정보"
      @click="$router.push(RouterPath.Admin.AdminMyPage.path)"
    />
    <v-list-group>
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-town-hall"
          title="학교 관리"
        ></v-list-item>
      </template>
      <v-list-item
        title="학교 추가"
        @click="$router.push(RouterPath.Admin.AdminSchoolManageCreatePage.path)"
      />
      <v-list-item
        title="학교 목록"
        @click="$router.push(RouterPath.Admin.AdminSchoolManageListPage.path)"
      />
    </v-list-group>
    <v-list-group>
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-account-music-outline"
          title="아티스트 관리"
        ></v-list-item>
      </template>
      <v-list-item
        title="아티스트 추가"
        @click="$router.push(RouterPath.Admin.AdminArtistManageCreatePage.path)"
      />
      <v-list-item
        title="아티스트 목록"
        @click="$router.push(RouterPath.Admin.AdminArtistManageListPage.path)"
      />
    </v-list-group>
    <v-list-group>
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-party-popper"
          title="축제 관리"
        ></v-list-item>
      </template>
      <v-list-item
        title="축제 추가"
        @click="$router.push(RouterPath.Admin.AdminFestivalManageCreatePage.path)"
      />
      <v-list-item
        title="축제 목록"
        @click="$router.push(RouterPath.Admin.AdminFestivalManageListPage.path)"
      />
    </v-list-group>
  </v-list>
</template>
