<script setup lang="ts">
import { useDrawerStore } from '@/stores/useDrawerStore.ts';

const drawerStore = useDrawerStore();
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawerStore.toggle" />
    <v-app-bar-title>페스타고 관리자 페이지</v-app-bar-title>
  </v-app-bar>
</template>
