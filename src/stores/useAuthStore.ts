import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AuthType } from '@/type/AuthType.ts';

export const useAuthStore = defineStore('auth', () => {
  const username = ref('');
  const authType = ref<AuthType>(AuthType.UNASSIGNED);

  const isAdmin = computed(() => {
    return authType.value === AuthType.ADMIN || authType.value === AuthType.ROOT;
  });

  const isLogin = computed(() => {
    return authType.value !== AuthType.UNASSIGNED;
  });

  function login(usernameInput: string, authTypeInput: AuthType) {
    username.value = usernameInput;
    authType.value = authTypeInput;
  }

  function logout() {
    username.value = '';
    authType.value = AuthType.UNASSIGNED;
  }

  return {
    username,
    authType,
    isAdmin,
    isLogin,
    login,
    logout,
  };
}, {
  persist: {
    storage: sessionStorage,
  },
});
