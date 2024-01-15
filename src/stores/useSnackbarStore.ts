import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSnackbarStore = defineStore('snackbar', () => {
  const message = ref({
    message: '',
    color: '',
  });

  function showSuccess(input: string) {
    message.value = {
      message: input,
      color: 'primary',
    };
  }

  function showError(input: string) {
    message.value = {
      message: input,
      color: 'error',
    };
  }

  return {
    message,
    showSuccess,
    showError,
  };
});
