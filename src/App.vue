<script setup lang="ts">
import Navigation from '@/components/navigation/Navigation.vue';
import Snackbar from '@/components/snackbar/Snackbar.vue';
</script>

<template>
  <v-app id="container">
    <Navigation />
    <v-main>
      <router-view />
    </v-main>
    <Snackbar />
  </v-app>
</template>
