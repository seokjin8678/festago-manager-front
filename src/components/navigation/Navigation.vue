<script setup lang="ts">
import { useDrawerStore } from '@/stores/useDrawerStore.ts';
import AuthButton from '@/components/navigation/AuthButton.vue';
import Drawer from '@/components/navigation/drawer/Drawer.vue';
import { onMounted, ref } from 'vue';

const drawerStore = useDrawerStore();
const isDev = ref(false)

onMounted(() => {
  isDev.value = import.meta.env.DEV
})

</script>

<template>
  <Drawer />
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawerStore.toggle" />
    <v-app-bar-title>
      <span class="text-body-1 text-md-h6">
        페스타고 관리자 페이지
      </span>
      <span class="text-body-1 text-md-h6 text-red-darken-4"  v-if="isDev">
        (개발 서버)
      </span>
    </v-app-bar-title>
    <AuthButton />
  </v-app-bar>
</template>
