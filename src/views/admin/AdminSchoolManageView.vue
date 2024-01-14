<script setup lang="ts">
import { Ref, ref } from 'vue';
import AdminSchoolService, { AdminSchoolResponse } from '@/api/admin/AdminSchoolService.ts';
import { PagingRequest } from '@/api/PagingRequest.ts';
import { SearchRequest } from '@/api/SearchRequest.ts';

const tableHeaders = [
  { title: 'ID', key: 'id' },
  { title: '이름', key: 'name' },
  { title: '도메인', key: 'domain' },
];
const searchFilters = [
  { title: 'ID', value: 'id' },
  { title: '이름', value: 'name' },
  { title: '도메인', value: 'domain' },
];
const itemsPerPageOption = [
  { value: '10', title:'10' },
  { value: '25', title:'25' },
  { value: '50', title:'50' },
]
const loading = ref(false);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const searchRequest: Ref<SearchRequest> = ref({ searchKeyword: null, filterKeyword: null });
const items: Ref<AdminSchoolResponse> = ref({ schools: [] });

// TODO 백엔드에서 검색 필터링을 구현해야함
function searchResult() {
  console.log('구현 예정');
}

function fetchItems(paging: PagingRequest) {
  loading.value = true;
  AdminSchoolService.fetchSchools(paging, searchRequest.value).then(response => {
    items.value.schools = response.data.schools;
    totalItems.value = response.data.schools.length;
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
    <v-row :no-gutters="true" align="center">
      <v-col :cols="3">
        <v-select
          v-model="searchRequest.filterKeyword"
          class="pa-2 ma-2"
          :clearable="true"
          label="필터"
          :items="searchFilters"
          variant="outlined"
          :hide-details="true"
        />
      </v-col>
      <v-col :cols="8">
        <v-text-field
          class="pa-2 ma-2"
          v-model="searchRequest.searchKeyword"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          :single-line="true"
          variant="outlined"
          :hide-details="true"
          maxLength="50"
        />
      </v-col>
      <v-col :cols="1">
        <v-btn
          class="py-7 text-h6"
          color="blue"
          variant="flat"
          :block="true"
          @click="searchResult"
          text="검색"
        />
      </v-col>
    </v-row>
    <v-data-table-server
      :headers="tableHeaders"
      :items-length="totalItems"
      :items="items.schools"
      :loading="loading"
      :items-per-page-options="itemsPerPageOption"
      v-model:items-per-page="itemsPerPage"
      @update:options="fetchItems"
    />
  </v-card>
</template>
