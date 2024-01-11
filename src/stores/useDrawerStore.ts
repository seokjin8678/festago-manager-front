import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDrawerStore = defineStore('drawer', () => {
  const isShow = ref(false);

  function toggle() {
    isShow.value = !isShow.value;
  }

  return {
    isShow,
    toggle,
  };
}, {
  persist: true,
});
