import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { useRouter } from 'vue-router';

const pinia = createPinia();
pinia.use(createPersistedState());
const router = useRouter();
createApp(App)
.use(vuetify)
.use(pinia)
.use(router)
.mount('#app');
