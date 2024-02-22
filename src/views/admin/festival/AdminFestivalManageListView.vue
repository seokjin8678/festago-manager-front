<script setup lang="ts">

import RouterPath from '@/router/RouterPath.ts';
import SearchForm from '@/components/form/SearchForm.vue';
import DataTable from '@/components/datatable/DataTable.vue';
import { SearchRequest } from '@/api/SearchRequest.ts';
import { Ref, ref } from 'vue';
import { PagingRequest } from '@/api/PagingRequest.ts';
import { FetchFestivalsResponse } from '@/api/spec/festival/FetchFestivalsApiSpec.ts';
import AdminFestivalService from '@/api/admin/AdminFestivalService.ts';

const tableHeaders = [
  { title: 'ID', key: 'id' },
  { title: '이름', key: 'name' },
  { title: '학교', key: 'schoolName' },
  { title: '시작일', key: 'startDate' },
  { title: '종료일', key: 'endDate' },
  { title: '공연 수', key: 'stageCount' },
  { title: '수정/삭제', key: 'actions', sortable: false },
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

const loading = ref(false);
const itemsPerPage = ref(10);
const searchRequest: Ref<SearchRequest> = ref({ searchFilter: null, searchKeyword: null });
const items: Ref<FetchFestivalsResponse> = ref({ content: [], totalElements: 0 });

function search(origin: SearchRequest) {
  searchRequest.value = origin;
  fetch({
    page: 1,
    itemsPerPage: itemsPerPage.value,
    sortBy: [],
  });
}

function fetch(paging: PagingRequest) {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  AdminFestivalService.fetchFestivals(paging, searchRequest.value).then(response => {
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
    <SearchForm
      :search="search"
      :search-filters="searchFilters"
    />
    <DataTable
      :loading="loading"
      :table-headers="tableHeaders"
      :items-per-page-options="itemsPerPageOptions"
      :fetch="fetch"
      :item-length="items.totalElements"
      :items="items.content"
      :detail-page-router-name="RouterPath.Admin.AdminFestivalManageEditPage.name"
    />
  </v-card>
</template>
