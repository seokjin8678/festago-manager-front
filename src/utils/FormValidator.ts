import { number, string } from 'zod';

const FormValidator = {
  School: {
    name: string({
      required_error: '대학교 이름은 필수입니다.',
    })
    .min(5, '대학교의 이름은 5글자 이상이어야 합니다.')
    .regex(/((학교|캠퍼스)$)/, '대학교의 이름은 "학교" 또는 "캠퍼스"로 끝나야 합니다.')
    .trim(),

    domain: string({
      required_error: '도메인은 필수입니다.',
    })
    .min(5, '도메인은 5글자 이상이어야 합니다.')
    .regex(/^[^.].*\..+$/, '도메인의 형식은 school.ac.kr과 같아야 합니다.')
    .regex(/^[a-zA-Z.]+$/, '도메인은 영문으로만 구성되어야 합니다.')
    .trim(),

    logoUrl: string({
      required_error: '로고 URL은 필수입니다.',
    })
    .max(255, '로고 URL은 255글자 미만이어야 합니다.')
    .startsWith('https://', '로고 URL은 https://로 시작되어야 합니다.')
    .trim(),

    backgroundImageUrl: string({
      required_error: '백그라운드 이미지 URL은 필수입니다.',
    })
    .max(255, '백그라운드 이미지 URL은 255글자 미만이어야 합니다.')
    .startsWith('https://', '백그라운드 이미지 URL은 https://로 시작되어야 합니다.')
    .trim(),

    region: string({
      required_error: '지역은 필수입니다.',
    })
    .trim(),
  },

  Festival: {
    schoolId: number({
      required_error: '학교는 필수입니다.',
    }),

    name: string({
      required_error: '축제 이름은 필수입니다.',
    })
    .min(5, '축제 이름은 5글자 이상이어야 합니다.')
    .trim(),

    startDate: string({
      required_error: '시작일은 필수입니다.',
    })
    .trim(),

    endDate: string({
      required_error: '종료일은 필수입니다.',
    })
    .trim(),

    posterImageUrl: string({
      required_error: '포스터 이미지 URL은 필수입니다.',
    })
    .max(255, '포스터 이미지 URL은 255글자 미만이어야 합니다.')
    .startsWith('https://', '포스터 이미지 URL은 https://로 시작되어야 합니다.')
    .trim(),
  },

  Artist: {
    name: string({
      required_error: '아티스트 이름은 필수입니다.',
    })
    .trim(),

    profileImageUrl: string({
      required_error: '프로필 이미지 URL은 필수입니다.',
    })
    .max(255, '프로필 이미지 URL은 255글자 미만이어야 합니다.')
    .startsWith('https://', '프로필 이미지 URL은 https://로 시작되어야 합니다.')
    .trim(),

    backgroundImageUrl: string({
      required_error: '백그라운드 이미지 URL은 필수입니다.',
    })
    .max(255, '백그라운드 이미지 URL은 255글자 미만이어야 합니다.')
    .startsWith('https://', '백그라운드 이미지 URL은 https://로 시작되어야 합니다.')
    .trim(),
  },

  SocialMedia: {
    socialMediaType: string({
      required_error: '소셜미디어 타입은 필수입니다.',
    })
    .trim(),

    name: string({
      required_error: '소셜미디어 이름은 필수입니다.',
    })
    .trim(),

    logoUrl: string({
      required_error: '로고 URL은 필수입니다.',
    })
    .max(255, '로고 URL은 255글자 미만이어야 합니다.')
    .startsWith('https://', '로고 URL은 https://로 시작되어야 합니다.')
    .trim(),

    url: string({
      required_error: 'URL은 필수입니다.',
    })
    .max(255, 'URL은 255글자 미만이어야 합니다.')
    .startsWith('https://', 'URL은 https://로 시작되어야 합니다.')
    .trim(),
  },

  Stage: {
    startTime: string({
      required_error: '공연 시작 시간은 필수입니다.',
    })
    .trim(),

    ticketOpenTime: string({
      required_error: '티켓 오픈 시간은 필수입니다.',
    })
    .trim(),
  },

  AdminLogin: {
    username: string({
      required_error: '계정은 필수입니다.',
    }),

    password: string({
      required_error: '비밀번호는 필수입니다.',
    }),
  },

  AdminRegister: {
    username: string({
      required_error: '계정은 필수입니다.',
    })
    .min(4, '계정의 길이는 4글자 이상이어야 합니다.'),

    password: string({
      required_error: '비밀번호는 필수입니다.',
    })
    .min(6, '비밀번호의 길이는 6글자 이상이어야 합니다.'),
  },
};

export default FormValidator;
