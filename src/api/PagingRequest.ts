import { SortItem } from 'vuetify/components';

export type PagingRequest = {
  page: number,
  itemsPerPage: number,
  sortBy: SortItem[],
}
