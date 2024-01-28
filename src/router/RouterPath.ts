import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import RootAdminView from '@/views/root/RootAdminView.vue';
import AdminMyPageView from '@/views/admin/AdminMyPageView.vue';
import AdminSchoolManageListView from '@/views/admin/school/AdminSchoolManageListView.vue';
import NotFoundView from '@/views/common/NotFoundView.vue';
import AdminFestivalManageView from '@/views/admin/AdminFestivalManageView.vue';
import AdminSchoolManageCreateView from '@/views/admin/school/AdminSchoolManageCreateView.vue';
import AdminSchoolManageEditView from '@/views/admin/school/AdminSchoolManageEditView.vue';
import SchoolFestivalManageView from '@/views/school/SchoolFestivalManageView.vue';
import AdminArtistManageListView from '@/views/admin/artist/AdminArtistManageListView.vue';
import AdminArtistManageCreateView from '@/views/admin/artist/AdminArtistManageCreateView.vue';
import AdminArtistManageEditView from '@/views/admin/artist/AdminArtistManageEditView.vue';

const RouterPath = {
  Common: {
    HomePage: {
      path: '/',
      name: 'homePage',
      component: HomeView,
    },
    NotFoundHandler: {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView,
    },
  },
  Auth: {
    LoginPage: {
      path: '/login',
      name: 'loginPage',
      component: LoginView,
    },
  },
  Admin: {
    RootAdminPage: {
      path: '/root',
      name: 'rootAdminPage',
      component: RootAdminView,
    },
    AdminMyPage: {
      path: '/admin/my-page',
      name: 'adminMyPage',
      component: AdminMyPageView,
    },
    AdminSchoolManageListPage: {
      path: '/admin/schools',
      name: 'adminSchoolManageListPage',
      component: AdminSchoolManageListView,
    },
    AdminSchoolManageCreatePage: {
      path: '/admin/school/create',  // 명시적으로 단수형 사용
      name: 'adminSchoolManageCreatePage',
      component: AdminSchoolManageCreateView,
    },
    AdminSchoolManageEditPage: {
      path: '/admin/school/edit/:id', // 명시적으로 단수형 사용
      name: 'adminSchoolManageEditPage',
      component: AdminSchoolManageEditView,
    },
    AdminFestivalManagePage: {
      path: '/admin/festivals',
      name: 'adminFestivalManagePage',
      component: AdminFestivalManageView,
    },
    AdminArtistManageCreatePage: {
      path: '/admin/artist/create', // 명시적으로 단수형 사용
      name: 'adminArtistManageCreatePage',
      component: AdminArtistManageCreateView,
    },
    AdminArtistManageListPage: {
      path: '/admin/artists',
      name: 'adminArtistManageListPage',
      component: AdminArtistManageListView,
    },
    AdminArtistManageEditPage: {
      path: '/admin/artist/edit/:id', // 명시적으로 단수형 사용
      name: 'adminArtistManageEditPage',
      component: AdminArtistManageEditView,
    },
  },
  School: {
    SchoolFestivalManagePage: {
      path: '/school/festivals',
      name: 'schoolFestivalManagePage',
      component: SchoolFestivalManageView,
    },
  },
};

export default RouterPath;
