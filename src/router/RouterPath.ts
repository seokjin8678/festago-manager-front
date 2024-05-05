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
import AdminAccountCreateView from '@/views/admin/root/AdminAccountCreateView.vue';
import AdminSchoolManageDetailView from '@/views/admin/school/AdminSchoolManageDetailView.vue';
import AdminSchoolSocialMediaManageCreateView
  from '@/views/admin/school/socialmedia/AdminSchoolSocialMediaManageCreateView.vue';
import AdminSocialMediaManageEditView from '@/views/admin/socialmedia/AdminSocialMediaManageEditView.vue';
import AdminArtistManageDetailView from '@/views/admin/artist/AdminArtistManageDetailView.vue';
import AdminArtistSocialMediaManageCreateView
  from '@/views/admin/artist/socialmedia/AdminArtistSocialMediaManageCreateView.vue';
import AdminStageManageEditView from '@/views/admin/stage/AdminStageManageEditView.vue';

const RouterPath = {
  Common: {
    HomeView: {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    NotFoundView: {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundView',
      component: NotFoundView,
    },
  },
  Auth: {
    LoginView: {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
    },
  },
  Admin: {
    RootAdminView: {
      path: '/root',
      name: 'RootAdminView',
      component: RootAdminView,
    },
    AdminAccountCreateView: {
      path: '/root/admin/create',
      name: 'AdminAccountCreateView',
      component: AdminAccountCreateView,
    },
    AdminMyPageView: {
      path: '/admin/my-page',
      name: 'AdminMyPageView',
      component: AdminMyPageView,
    },
    AdminSchoolManageDetailView: {
      path: '/admin/schools/:id',
      name: 'AdminSchoolManageDetailView',
      component: AdminSchoolManageDetailView,
    },
    AdminSchoolManageListView: {
      path: '/admin/schools',
      name: 'AdminSchoolManageListView',
      component: AdminSchoolManageListView,
    },
    AdminSchoolManageCreateView: {
      path: '/admin/school/create',  // 명시적으로 단수형 사용
      name: 'AdminSchoolManageCreateView',
      component: AdminSchoolManageCreateView,
    },
    AdminSchoolManageEditView: {
      path: '/admin/schools/:id/edit',
      name: 'AdminSchoolManageEditView',
      component: AdminSchoolManageEditView,
    },
    AdminSchoolSocialMediaManageCreateView: {
      path: '/admin/schools/:id/socialmedia/create',
      name: 'AdminSchoolSocialMediaManageCreateView',
      component: AdminSchoolSocialMediaManageCreateView,
    },
    AdminArtistManageCreateView: {
      path: '/admin/artist/create', // 명시적으로 단수형 사용
      name: 'AdminArtistManageCreateView',
      component: AdminArtistManageCreateView,
    },
    AdminArtistManageListView: {
      path: '/admin/artists',
      name: 'AdminArtistManageListView',
      component: AdminArtistManageListView,
    },
    AdminArtistManageEditView: {
      path: '/admin/artists/:id/edit',
      name: 'AdminArtistManageEditView',
      component: AdminArtistManageEditView,
    },
    AdminArtistManageDetailView: {
      path: '/admin/artists/:id',
      name: 'AdminArtistManageDetailView',
      component: AdminArtistManageDetailView,
    },
    AdminArtistSocialMediaManageCreateView: {
      path: '/admin/artists/:id/socialmedia/create',
      name: 'AdminArtistSocialMediaManageCreateView',
      component: AdminArtistSocialMediaManageCreateView,
    },
    AdminFestivalManageCreateView: {
      path: '/admin/festival/create', // 명시적으로 단수형 사용
      name: 'AdminFestivalManageCreateView',
      component: AdminFestivalManageCreateView,
    },
    AdminFestivalManageListView: {
      path: '/admin/festivals',
      name: 'AdminFestivalManageListView',
      component: AdminFestivalManageListView,
    },
    AdminFestivalManageDetailView: {
      path: '/admin/festivals/:id',
      name: 'AdminFestivalManageDetailView',
      component: AdminFestivalManageDetailView,
    },
    AdminFestivalManageEditView: {
      path: '/admin/festivals/:id/edit',
      name: 'AdminFestivalManageEditView',
      component: AdminFestivalManageEditView,
    },
    AdminStageManageCreateView: {
      path: '/admin/festivals/:id/stage/create',
      name: 'AdminStageManageCreateView',
      component: AdminStageManageCreateView,
    },
    AdminStageManageEditView: {
      path: '/admin/stages/:id/edit',
      name: 'AdminStageManageEditView',
      component: AdminStageManageEditView,
    },
    AdminSocialMediaManageEditView: {
      path: '/admin/socialmedias/:id/edit',
      name: 'AdminSocialMediaManageEditView',
      component: AdminSocialMediaManageEditView,
    },
  },
  School: {
    SchoolFestivalManageView: {
      path: '/school/festivals',
      name: 'SchoolFestivalManageView',
      component: SchoolFestivalManageView,
    },
  },
};

export default RouterPath;
