<script setup lang="ts">
import Navigation from '@/components/navigation/Navigation.vue';
</script>

<template>
  <v-app id="container">
    <Navigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
