<script setup lang="ts">
import { Ref, ref } from 'vue';
import AdminSchoolService from '@/api/admin/AdminSchoolService.ts';
import { PagingRequest } from '@/api/PagingRequest.ts';
import { SearchRequest } from '@/api/SearchRequest.ts';
import RouterPath from '@/router/RouterPath.ts';
import { FetchSchoolsResponse } from '@/api/spec/school/FetchSchoolsApiSpec.ts';
import SearchForm from '@/components/form/SearchForm.vue';
import DataTable from '@/components/datatable/DataTable.vue';

const tableHeaders = [
  { title: 'ID', key: 'id' },
  { title: '이름', key: 'name' },
  { title: '도메인', key: 'domain' },
  { title: '수정/삭제', key: 'actions', sortable: false },
];
const searchFilters = [
  { title: 'ID', value: 'id' },
  { title: '이름', value: 'name' },
  { title: '도메인', value: 'domain' },
];
const itemsPerPageOptions = [
  { value: 1, title: '1' },
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
];
const loading = ref(false);
const itemsPerPage = ref(10);
const searchRequest: Ref<SearchRequest> = ref({ searchFilter: null, searchKeyword: null });
const items: Ref<FetchSchoolsResponse> = ref({ schools: [] });

// TODO 백엔드에서 검색 필터링을 구현해야함
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
  setTimeout(() => (loading.value = false), 1000)
  AdminSchoolService.fetchSchools(paging, searchRequest.value).then(response => {
    const { schools } = response.data;
    items.value.schools = schools;
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
    <SearchForm
      :search="search"
      :search-filters="searchFilters"
    />
    <DataTable
      :table-headers="tableHeaders"
      :items-per-page-options="itemsPerPageOptions"
      :fetch="fetch"
      :item-length="items.schools.length"
      :items="items.schools"
      :detail-page-router-name="RouterPath.Admin.AdminSchoolManageEditPage.name"
    />
  </v-card>
</template>
