<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';

const snackbarStore = useSnackbarStore();
const message = ref('');
const color = ref('');
const isShow = ref(false);
const timeout = ref(5000);

watch(() => snackbarStore.message, (it) => {
  message.value = it.message;
  color.value = it.color;
  isShow.value = true;
});
</script>

<template>
  <v-snackbar
    :color="color"
    variant="tonal"
    v-model="isShow"
    :timeout="timeout"
    transition="fade-transition"
  >
    <div class="text-center pt-6">
      <p class="text-body-1 my-2">
        {{ message }}
      </p>
      <v-btn
        class="font-weight-bold"
        color="grey-darken-3"
        variant="text"
        @click="isShow = false"
      >
        닫기
      </v-btn>
    </div>
  </v-snackbar>
</template>
