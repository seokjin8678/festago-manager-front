import ApiSpec from '@/api/spec/ApiSpec.ts';

export type FetchOneFestivalRequest = {
  // empty
}

export type FetchOneFestivalResponse = {
  id: number,
  name: string,
  school: {
    name: string,
    id: number
  }
  startDate: string,
  endDate: string,
  posterImageUrl: string,
  socialMedias: {
    type: string,
    name: string,
    logoUrl: string,
    url: string
  }[],
  stages: {
    id: number,
    startDateTime: string,
    artists: {
      id: number,
      name: string,
      profileImage: string,
      backgroundImageUrl: string
    }[]
  }[]
}

// TODO 새로운 축제 상세 조회용 어드민 API가 필요함
const FetchOneFestivalApiSpec = (festivalId: number): ApiSpec => ({
  url: `/api/v1/festivals/${festivalId}`,
  method: 'GET',
});

export default FetchOneFestivalApiSpec;
