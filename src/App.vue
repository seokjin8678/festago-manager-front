<script setup lang="ts">
import Navigation from '@/components/navigation/Navigation.vue';
import 'vuetify-sonner/style.css';
import { VSonner } from 'vuetify-sonner';
</script>

<template>
  <v-app id="container">
    <Navigation />
    <VSonner />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
