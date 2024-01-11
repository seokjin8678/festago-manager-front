<script setup lang="ts">
import Drawer from '@/components/navigation/Drawer.vue';
import Navigation from '@/components/navigation/Navigation.vue';
</script>

<template>
  <v-app id="container">
    <Drawer></Drawer>
    <Navigation></Navigation>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
