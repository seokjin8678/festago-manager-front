<script setup lang="ts">

import RouterPath from '@/router/RouterPath.ts';
import DataTable from '@/components/datatable/DataTable.vue';
import { Ref, ref } from 'vue';
import { PagingRequest } from '@/api/PagingRequest.ts';
import { FetchFestivalsResponse } from '@/api/spec/festival/FetchFestivalsApiSpec.ts';
import AdminFestivalService from '@/api/admin/AdminFestivalService.ts';
import { router } from '@/router';
import { useSearchStore } from '@/stores/useSearchStore.ts';

const tableHeaders = [
  { title: 'ID', key: 'id' },
  { title: '이름', key: 'name' },
  { title: '학교', key: 'schoolName' },
  { title: '시작일', key: 'startDate' },
  { title: '종료일', key: 'endDate' },
  { title: '공연 수', key: 'stageCount', sortable: false },
  { title: '상세', key: 'actions', sortable: false },
];
const searchFilters = [
  { title: 'ID', value: 'id' },
  { title: '이름', value: 'name' },
  { title: '학교', value: 'schoolName' },
];
const itemsPerPageOptions = [
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
];

const searchFilterStore = useSearchStore();
const loading = ref(false);
const items: Ref<FetchFestivalsResponse> = ref({ content: [], totalElements: 0 });

function fetch(paging: PagingRequest) {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  const searchRequest = searchFilterStore.getSearchRequest(router.currentRoute.value.name?.toString());
  AdminFestivalService.fetchFestivals(paging, searchRequest).then(response => {
    items.value = response.data;
    loading.value = false;
  });
}

</script>

<template>
  <v-card
    class="pa-10 ma-10 pt-0"
    :flat="true"
    title="축제 목록"
  >
    <DataTable
      :search-filters="searchFilters"
      :loading="loading"
      :table-headers="tableHeaders"
      :items-per-page-options="itemsPerPageOptions"
      :fetch="fetch"
      :item-length="items.totalElements"
      :items="items.content"
      :detail-page-router-name="RouterPath.Admin.AdminFestivalManageDetailView.name"
    />
  </v-card>
</template>
