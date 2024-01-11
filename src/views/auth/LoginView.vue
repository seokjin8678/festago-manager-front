<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore.ts';
import { ref } from 'vue';
import { router } from '@/router';
import { AuthType } from '@/type/AuthType.ts';

const authStore = useAuthStore();
const visible = ref(false);

// TODO 로그인 구현할 것
function login() {
  authStore.login('glen', AuthType.SCHOOL);
  router.push('/');
}

</script>

<template>
  <v-card
    class="mx-auto my-8 pa-12 pb-8"
    max-width="800"
    elevation="4"
  >
    <v-card-title>
      <p class="text-h4 text-center">
        로그인
      </p>
    </v-card-title>

    <div class="text-subtitle-1 text-medium-emphasis">
      계정
    </div>
    <v-text-field
      density="compact"
      placeholder="계정을 입력해주세요."
      prepend-inner-icon="mdi-account-outline"
      variant="outlined"
    />

    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      비밀번호
    </div>
    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="비밀번호를 입력해주세요."
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
    />

    <v-btn
      :block="true"
      class="mb-8"
      color="blue"
      size="large"
      @click="login"
    >
      로그인
    </v-btn>
  </v-card>
</template>
