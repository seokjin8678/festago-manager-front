<script setup lang="ts">

import RouterPath from '@/router/RouterPath.ts';
import DataTable from '@/components/datatable/DataTable.vue';
import { Ref, ref } from 'vue';
import AdminArtistService from '@/api/admin/AdminArtistService.ts';
import { FetchArtistsResponse } from '@/api/spec/artist/FetchArtistsApiSpec.ts';

const tableHeaders = [
  { title: 'ID', key: 'id' },
  { title: '이름', key: 'name' },
  { title: '프로필 URL', key: 'profileImage' },
  { title: '수정/삭제', key: 'actions', sortable: false },
];

const itemsPerPageOptions = [
  { value: 1, title: '1' },
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
];

const items: Ref<FetchArtistsResponse> = ref([]);
const loading = ref(false);

function fetch() {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  AdminArtistService.fetchArtists().then(response => {
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
    <DataTable
      :loading="loading"
      :table-headers="tableHeaders"
      :items-per-page-options="itemsPerPageOptions"
      :fetch="fetch"
      :item-length="items.length"
      :items="items"
      :detail-page-router-name="RouterPath.Admin.AdminArtistManageEditPage.name"
    />
  </v-card>
</template>
