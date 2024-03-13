import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import RootAdminView from '@/views/root/RootAdminView.vue';
import AdminMyPageView from '@/views/admin/AdminMyPageView.vue';
import AdminSchoolManageListView from '@/views/admin/school/AdminSchoolManageListView.vue';
import NotFoundView from '@/views/common/NotFoundView.vue';
import AdminSchoolManageCreateView from '@/views/admin/school/AdminSchoolManageCreateView.vue';
import AdminSchoolManageEditView from '@/views/admin/school/AdminSchoolManageEditView.vue';
import SchoolFestivalManageView from '@/views/school/SchoolFestivalManageView.vue';
import AdminArtistManageListView from '@/views/admin/artist/AdminArtistManageListView.vue';
import AdminArtistManageCreateView from '@/views/admin/artist/AdminArtistManageCreateView.vue';
import AdminArtistManageEditView from '@/views/admin/artist/AdminArtistManageEditView.vue';
import AdminFestivalManageCreateView from '@/views/admin/festival/AdminFestivalManageCreateView.vue';
import AdminFestivalManageListView from '@/views/admin/festival/AdminFestivalManageListView.vue';
import AdminFestivalManageEditView from '@/views/admin/festival/AdminFestivalManageEditView.vue';
import AdminFestivalManageDetailView from '@/views/admin/festival/AdminFestivalManageDetailView.vue';
import AdminStageManageCreateView from '@/views/admin/stage/AdminStageManageCreateView.vue';

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
      path: '/admin/schools/:id/edit',
      name: 'adminSchoolManageEditPage',
      component: AdminSchoolManageEditView,
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
      path: '/admin/artists/:id/edit',
      name: 'adminArtistManageEditPage',
      component: AdminArtistManageEditView,
    },
    AdminFestivalManageCreatePage: {
      path: '/admin/festival/create', // 명시적으로 단수형 사용
      name: 'adminFestivalManageCreatePage',
      component: AdminFestivalManageCreateView,
    },
    AdminFestivalManageListPage: {
      path: '/admin/festivals',
      name: 'adminFestivalManageListPage',
      component: AdminFestivalManageListView,
    },
    AdminFestivalManageDetailView: {
      path: '/admin/festivals/:id',
      name: 'adminFestivalManageDetailPage',
      component: AdminFestivalManageDetailView,
    },
    AdminFestivalManageEditPage: {
      path: '/admin/festivals/:id/edit',
      name: 'adminFestivalManageEditPage',
      component: AdminFestivalManageEditView,
    },
    AdminStageManageCreatePage: {
      path: '/admin/festivals/:id/stage/create',
      name: 'adminStageManageCreatePage',
      component: AdminStageManageCreateView,
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
