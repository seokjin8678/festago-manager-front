import RootAdminView from '@/views/root/RootAdminView.vue';
import AdminMyPageView from '@/views/admin/AdminMyPageView.vue';
import AdminSchoolManageListView from '@/views/admin/school/AdminSchoolManageListView.vue';
import AdminFestivalManageView from '@/views/admin/AdminFestivalManageView.vue';
import AdminSchoolManageCreateView from '@/views/admin/school/AdminSchoolManageCreateView.vue';

const adminRoutes = [
  {
    path: '/root',
    name: 'root',
    component: RootAdminView,
  },
  {
    path: '/admin/my-page',
    name: 'adminMyPage',
    component: AdminMyPageView,
  },
  {
    path: '/admin/school',
    name: 'adminSchoolManageListView',
    component: AdminSchoolManageListView,
  },
  {
    path: '/admin/festival',
    name: 'adminFestivalManage',
    component: AdminFestivalManageView,
  },
  {
    path: '/admin/school/create',
    name: 'adminSchoolManageCreateView',
    component: AdminSchoolManageCreateView
  }
];
export default adminRoutes;
