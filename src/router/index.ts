import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import RouterPath from '@/router/RouterPath.ts';

const routes: RouteRecordRaw[] = [
  ...Object.values(RouterPath.Common),
  ...Object.values(RouterPath.Auth),
  ...Object.values(RouterPath.Admin),
  ...Object.values(RouterPath.School)
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isLogin || authStore.isTokenExpired) {
    authStore.logout();
    if (to.path === '/login') {
      return next();
    }
    return next('/login');
  }
  return next();
});

