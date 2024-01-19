<script setup lang="ts">
import { Ref, ref } from 'vue';
import AdminSchoolService from '@/api/admin/AdminSchoolService.ts';
import { PagingRequest } from '@/api/PagingRequest.ts';
import { SearchRequest } from '@/api/SearchRequest.ts';
import RouterPath from '@/router/RouterPath.ts';
import { FetchSchoolsResponse } from '@/api/spec/school/FetchSchoolsApiSpec.ts';
import SearchForm from '@/components/form/SearchForm.vue';

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
const itemsPerPageOption = [
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
];
const loading = ref(false);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const searchRequest: Ref<SearchRequest> = ref({ searchKeyword: null, filterKeyword: null });
const items: Ref<FetchSchoolsResponse> = ref({ schools: [] });

// TODO 백엔드에서 검색 필터링을 구현해야함
function search(origin: SearchRequest) {
  searchRequest.value = origin;
  fetchItems({
    page: 1,
    itemsPerPage: itemsPerPage.value,
    sortBy: [],
  });
}

function fetchItems(paging: PagingRequest) {
  loading.value = true;
  AdminSchoolService.fetchSchools(paging, searchRequest.value).then(response => {
    const { schools } = response.data;
    items.value.schools = schools;
    totalItems.value = schools.length;
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
    <v-data-table-server
      :headers="tableHeaders"
      :items-length="totalItems"
      :items="items.schools"
      :loading="loading"
      :items-per-page-options="itemsPerPageOption"
      v-model:items-per-page="itemsPerPage"
      @update:options="fetchItems"
    >
      <template v-slot:item.actions="{item}">
        <v-icon
          class="mr-2"
          icon="mdi-pencil"
          color="grey-darken-3"
          @click="$router.push({
            name: RouterPath.Admin.AdminSchoolManageEditPage.name,
            params: { id: item.id }
          })"
        />
      </template>
    </v-data-table-server>
  </v-card>
</template>
