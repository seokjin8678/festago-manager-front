<script setup lang="ts">
import { Ref, ref } from 'vue';
import AdminSchoolService from '@/api/admin/AdminSchoolService.ts';
import RouterPath from '@/router/RouterPath.ts';
import { FetchSchoolsResponse } from '@/api/spec/school/FetchSchoolsApiSpec.ts';
import DataSearchTable from '@/components/datatable/DataSearchTable.vue';
import { FetchRequest } from '@/api/FetchRequest.ts';

const tableHeaders = [
  { title: 'ID', key: 'id' },
  { title: '이름', key: 'name' },
  { title: '도메인', key: 'domain' },
  { title: '지역', key: 'region' },
  { title: '상세', key: 'actions', sortable: false },
];
const searchFilters = [
  { title: 'ID', value: 'id' },
  { title: '이름', value: 'name' },
  { title: '도메인', value: 'domain' },
  { title: '지역', value: 'region' },
];
const itemsPerPageOptions = [
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
];
const loading = ref(false);
const items: Ref<FetchSchoolsResponse> = ref({ content: [], totalElements: 0 });

function fetch(request: FetchRequest) {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  AdminSchoolService.fetchSchools(request.paging, request.search).then(response => {
    items.value = response.data;
  }).finally(() => {
    loading.value = false;
  });
}
</script>

<template>
  <v-card
    class="pa-10 ma-10 pt-0"
    :flat="true"
    title="학교 목록"
  >
    <DataSearchTable
      :loading="loading"
      :table-headers="tableHeaders"
      :items-per-page-options="itemsPerPageOptions"
      @fetch="fetch"
      :item-length="items.totalElements"
      :items="items.content"
      :detail-page-router-name="RouterPath.Admin.AdminSchoolManageDetailView.name"
      :search-filters="searchFilters"
    />
  </v-card>
</template>
