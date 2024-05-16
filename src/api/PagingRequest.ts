import { SortItem } from '@/type/SortItem.ts';

export type PagingRequest = {
  page: number,
  itemsPerPage: number,
  sortBy?: SortItem | null,
}
