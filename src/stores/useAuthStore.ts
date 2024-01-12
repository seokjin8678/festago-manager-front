import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AuthType } from '@/type/AuthType.ts';
import ApiService from '@/api';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref('');
  const username = ref('');
  const authType = ref<AuthType>(AuthType.UNASSIGNED);

  const isAdmin = computed(() => {
    return authType.value === AuthType.ADMIN || authType.value === AuthType.ROOT;
  });

  const isLogin = computed(() => {
    return authType.value !== AuthType.UNASSIGNED;
  });

  function login(dto: {
    accessToken: string,
    username: string,
    authType: AuthType
  }) {
    accessToken.value = dto.accessToken;
    username.value = dto.username;
    authType.value = dto.authType;
  }

  function logout() {
    accessToken.value = '';
    username.value = '';
    authType.value = AuthType.UNASSIGNED;
  }

  return {
    accessToken,
    username,
    authType,
    isAdmin,
    isLogin,
    login,
    logout,
  };
}, {
  persist: {
    storage: localStorage,
    afterRestore(_context) {
      const authStore = useAuthStore();
      ApiService.changeAccessToken(authStore.accessToken);
    },
  },
});
