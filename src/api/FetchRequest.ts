import { PagingRequest } from '@/api/PagingRequest.ts';
import { SearchRequest } from '@/api/SearchRequest.ts';

export type FetchRequest = {
  paging: PagingRequest,
  search: SearchRequest
}
