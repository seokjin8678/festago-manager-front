import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AuthType } from '@/type/AuthType.ts';

export const useAuthStore = defineStore('auth', () => {
  const username = ref('');
  const authType = ref<AuthType>(AuthType.UNASSIGNED);
  const tokenExpirationTime = ref(0);

  const isAdmin = computed(() => {
    return authType.value === AuthType.ADMIN || authType.value === AuthType.ROOT;
  });

  const isLogin = computed(() => {
    return authType.value !== AuthType.UNASSIGNED;
  });

  const isTokenExpired = computed(() => {
    return tokenExpirationTime.value <= Date.now();
  });

  function login(dto: {
    username: string,
    authType: AuthType
  }) {
    username.value = dto.username;
    authType.value = dto.authType;
    tokenExpirationTime.value = Date.now() + 6 * 60 * 60 * 1000; // 6시간
  }

  function logout() {
    username.value = '';
    authType.value = AuthType.UNASSIGNED;
    tokenExpirationTime.value = 0;
  }

  return {
    username,
    authType,
    tokenExpirationTime,
    isAdmin,
    isLogin,
    isTokenExpired,
    login,
    logout,
  };
}, {
  persist: {
    storage: localStorage,
    afterRestore(_context) {
      const authStore = useAuthStore();
      if (authStore.isTokenExpired) {
        authStore.logout();
      }
    },
  },
});
