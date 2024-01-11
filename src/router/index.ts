import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/common/NotFoundView.vue';
import { useAuthStore } from '@/stores/useAuthStore.ts';
import authRoutes from '@/router/modules/auth/authRoutes.ts';
import adminRoutes from '@/router/modules/admin/adminRoutes.ts';
import schoolRoutes from '@/router/modules/school/schoolRoutes.ts';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundView,
  },
  ...authRoutes,
  ...adminRoutes,
  ...schoolRoutes,
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isLogin) {
    if (to.path === '/login') {
      return next();
    }
    return next('/login');
  }
  return next();
});

