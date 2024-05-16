<script setup lang="ts">

import RouterPath from '@/router/RouterPath.ts';
import DataSearchTable from '@/components/datatable/DataSearchTable.vue';
import { Ref, ref } from 'vue';
import AdminArtistService from '@/api/admin/AdminArtistService.ts';
import { FetchArtistsResponse } from '@/api/spec/artist/FetchArtistsApiSpec.ts';
import { FetchRequest } from '@/api/FetchRequest.ts';

const tableHeaders = [
  { title: 'ID', key: 'id' },
  { title: '이름', key: 'name' },
  { title: '상세', key: 'actions', sortable: false },
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
const items: Ref<FetchArtistsResponse> = ref({ content: [], totalElements: 0 });

function fetch(request: FetchRequest) {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  AdminArtistService.fetchArtists(request.paging, request.search).then(response => {
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
    title="아티스트 목록"
  >
    <DataSearchTable
      :search-filters="searchFilters"
      :loading="loading"
      :table-headers="tableHeaders"
      :items-per-page-options="itemsPerPageOptions"
      @fetch="fetch"
      :item-length="items.totalElements"
      :items="items.content"
      :detail-page-router-name="RouterPath.Admin.AdminArtistManageDetailView.name"
    />
  </v-card>
</template>
