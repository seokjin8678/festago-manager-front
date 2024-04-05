<script setup lang="ts">

import RouterPath from '@/router/RouterPath.ts';
import DataTable from '@/components/datatable/DataTable.vue';
import { Ref, ref } from 'vue';
import AdminArtistService from '@/api/admin/AdminArtistService.ts';
import { FetchArtistsResponse } from '@/api/spec/artist/FetchArtistsApiSpec.ts';
import SearchForm from '@/components/form/SearchForm.vue';
import { SearchRequest } from '@/api/SearchRequest.ts';
import { PagingRequest } from '@/api/PagingRequest.ts';

const tableHeaders = [
  { title: 'ID', key: 'id' },
  { title: '이름', key: 'name' },
  { title: '수정/삭제', key: 'actions', sortable: false },
];
const searchFilters = [
  { title: 'ID', value: 'id' },
  { title: '이름', value: 'name' },
];
const itemsPerPageOptions = [
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
];

const loading = ref(false);
const itemsPerPage = ref(10);
const searchRequest: Ref<SearchRequest> = ref({ searchFilter: null, searchKeyword: null });
const items: Ref<FetchArtistsResponse> = ref({ content: [], totalElements: 0 });

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
  AdminArtistService.fetchArtists(paging, searchRequest.value).then(response => {
    items.value = response.data;
    loading.value = false;
  });
}

</script>

<template>
  <v-card
    class="pa-10 ma-10 pt-0"
    :flat="true"
    title="아티스트 목록"
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
      :detail-page-router-name="RouterPath.Admin.AdminArtistManageEditPage.name"
    />
  </v-card>
</template>
