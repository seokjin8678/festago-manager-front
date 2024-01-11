import RootAdminView from '@/views/root/RootAdminView.vue';
import AdminMyPageView from '@/views/admin/AdminMyPageView.vue';
import AdminSchoolManageView from '@/views/admin/AdminSchoolManageView.vue';
import AdminFestivalManageView from '@/views/admin/AdminFestivalManageView.vue';

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
    name: 'adminSchoolManage',
    component: AdminSchoolManageView,
  },
  {
    path: '/admin/festival',
    name: 'adminFestivalManage',
    component: AdminFestivalManageView,
  },
];
export default adminRoutes;
