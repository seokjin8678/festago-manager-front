<script setup lang="ts">

import { PagingRequest } from '@/api/PagingRequest.ts';

const loading = defineModel<boolean>('loading', { required: true });
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
  fetch: (request: PagingRequest) => void,
  itemLength: number,
  items: any[],
  detailPageRouterName?: string
}>();

</script>

<template>
  <v-data-table-server
    :headers="props.tableHeaders"
    :loading="loading"
    :items-length="props.itemLength"
    :items="props.items"
    :items-per-page-options="props.itemsPerPageOptions"
    @update:options="props.fetch"
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
