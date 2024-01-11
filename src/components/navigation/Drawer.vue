<script setup lang="ts">
import { useDrawerStore } from '@/stores/useDrawerStore.ts';

const drawerStore = useDrawerStore();
</script>

<template>
  <v-navigation-drawer v-model="drawerStore.isShow" disable-resize-watcher="true">
    <!--  -->
  </v-navigation-drawer>
</template>
