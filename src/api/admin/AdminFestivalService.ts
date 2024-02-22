import CreateFestivalApiSpec, {
  CreateFestivalRequest,
  CreateFestivalResponse,
} from '@/api/spec/festival/CreateFestivalApiSpec.ts';
import ApiService from '@/api';
import { SearchRequest } from '@/api/SearchRequest.ts';
import { PagingRequest } from '@/api/PagingRequest.ts';
import { FetchFestivalsResponse } from '@/api/spec/festival/FetchFestivalsApiSpec.ts';

const AdminFestivalService = {
  createFestival(request: CreateFestivalRequest) {
    return ApiService.request<CreateFestivalResponse>(CreateFestivalApiSpec, request);
  },
  fetchFestivals(paging: PagingRequest, value: SearchRequest) {
    // mock
    return Promise.resolve<{ data: FetchFestivalsResponse }>({
      data: {
        content: [
          {
            id: 1,
            name: '테코대학교 축제',
            schoolName: '테코대학교',
            endDate: '2077-06-30',
            startDate: '2077-06-30',
            stageCount: 2,
            schoolId: 1,
            posterImageUrl: 'https://image.com/image.png',
          },
        ],
        totalElements: 1,
      },
    });
  },
};

export default AdminFestivalService;
