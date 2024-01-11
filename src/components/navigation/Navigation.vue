<script setup lang="ts">
import { useDrawerStore } from '@/stores/useDrawerStore.ts';
import AuthButton from '@/components/navigation/AuthButton.vue';
import Drawer from '@/components/navigation/drawer/Drawer.vue';

const drawerStore = useDrawerStore();
</script>

<template>
  <Drawer />
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawerStore.toggle" />
    <v-app-bar-title>페스타고 관리자 페이지</v-app-bar-title>
    <AuthButton />
  </v-app-bar>
</template>
