<script setup lang="ts">

import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import { useSearchStore } from '@/stores/useSearchStore.ts';
import { router } from '@/router';
import { SearchRequest } from '@/api/SearchRequest.ts';
import { SortItem } from '@/type/SortItem.ts';
import { FetchRequest } from '@/api/FetchRequest.ts';

const searchStore = useSearchStore();
const page = ref(1);
const searchRequest = reactive<SearchRequest>({ searchFilter: null, searchKeyword: null });
const order = ref<SortItem | null>(null);
const itemsPerPage = ref(10);
const loading = defineModel<boolean>('loading', { required: true });
const emits = defineEmits<(e: 'fetch', request: FetchRequest) => void>();
const props = defineProps<{
  tableHeaders: {
    title: string,
    key: string,
    sortable?: boolean,
  }[],
  itemsPerPageOptions: {
    title: string,
    value: number,
  }[],
  itemLength: number,
  items: any[],
  detailPageRouterName?: string,
  searchFilters: { title: string, value: string }[]
}>();

function fetch() {
  if (loading.value) {
    return;
  }
  const routeName = router.currentRoute.value.name?.toString();
  emits('fetch', {
    paging: {
      page: searchStore.getPage(routeName) ?? page.value,
      sortBy: searchStore.getOrder(routeName) ?? order.value,
      itemsPerPage: itemsPerPage.value,
    },
    search: searchRequest,
  });
}

function updatePage(update: number) {
  if (loading.value) {
    return;
  }
  const name = router.currentRoute.value.name?.toString();
  if (name) {
    searchStore.setPage(name, update);
  }
  page.value = update;
}

function updateOrder(update: SortItem[]) {
  const name = router.currentRoute.value.name?.toString();
  if (name) {
    searchStore.setOrder(name, update[0]);
  }
  order.value = update[0];
}

function updateItemsPerPage(update: number) {
  const routeName = router.currentRoute.value.name?.toString();
  if (routeName) {
    searchStore.setItemsPerPage(routeName, update);
  }
}

function search() {
  const routeName = router.currentRoute.value.name?.toString();
  if (routeName) {
    searchStore.setKeyword(routeName, searchRequest.searchKeyword);
  }
  updatePage(1);
  fetch();
}

watch(() => searchRequest.searchFilter, () => {
  const routeName = router.currentRoute.value.name;
  if (routeName) {
    searchStore.setFilter(routeName.toString(), searchRequest.searchFilter);
  }
});

onBeforeMount(() => {
  const routeName = router.currentRoute.value.name?.toString();
  itemsPerPage.value = searchStore.getItemsPerPage(routeName) ?? props.itemsPerPageOptions[0].value;
});

onMounted(() => {
  const routeName = router.currentRoute.value.name?.toString();
  page.value = searchStore.getPage(routeName) ?? 1;
  order.value = searchStore.getOrder(routeName);
  searchRequest.searchFilter = searchStore.getFilter(routeName);
  searchRequest.searchKeyword = searchStore.getKeyword(routeName);
});

</script>

<template>
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
        @click="search"
      />
    </v-col>
  </v-row>

  <v-data-table-server
    :show-current-page="true"
    v-model:items-per-page="itemsPerPage"
    :headers="props.tableHeaders"
    :loading="loading"
    :items-length="props.itemLength"
    :items="props.items"
    :items-per-page-options="props.itemsPerPageOptions"
    :page="page"
    @update:options="fetch"
    @update:page="updatePage"
    @update:sort-by="updateOrder"
    @update:items-per-page="updateItemsPerPage"
  >
    <template v-slot:item.actions="{item}" v-if="!!(props.detailPageRouterName)">
      <v-icon
        class="mr-2"
        icon="mdi-pencil"
        color="grey-darken-3"
        @click="$router.push({
          name: props.detailPageRouterName,
          params: { id: item.id }
        })"
      />
    </template>
  </v-data-table-server>
</template>
