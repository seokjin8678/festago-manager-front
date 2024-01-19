<script setup lang="ts">
import { ref } from 'vue';
import { SearchRequest } from '@/api/SearchRequest.ts';

const props = defineProps<{
  searchFilters: { title: string, value: string }[]
  search: (searchRequest: SearchRequest) => {}
}>();
const searchRequest = ref<SearchRequest>({ searchFilter: null, searchKeyword: null });
const loading = ref(false);

function searchFunction() {
  loading.value = true;
  setTimeout(() => loading.value = false, 500);
  props.search(searchRequest.value);
}
</script>

<template>
  <v-form
    @submit.prevent="searchFunction"
  >
    <v-row :no-gutters="true" align="center">
      <v-col :cols="3">
        <v-select
          class="pa-2 ma-2"
          v-model="searchRequest.searchFilter"
          :clearable="true"
          label="필터"
          :items="props.searchFilters"
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
          :loading="loading"
          :disabled="!(!!(searchRequest.searchKeyword && searchRequest.searchFilter))"
          class="py-7 text-h6"
          color="blue"
          type="submit"
          variant="flat"
          :block="true"
          text="검색"
        />
      </v-col>
    </v-row>
  </v-form>
</template>
