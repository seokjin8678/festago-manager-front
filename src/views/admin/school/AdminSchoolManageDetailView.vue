<script setup lang="ts">

import { useRoute } from 'vue-router';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { onMounted, Ref, ref } from 'vue';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import RouterPath from '@/router/RouterPath.ts';
import { FetchOneSchoolResponse } from '@/api/spec/school/FetchOneSchoolApiSpec.ts';
import AdminSchoolService from '@/api/admin/AdminSchoolService.ts';
import { FetchSocialMediasResponse } from '@/api/spec/socialmedia/FetchSocialMediasApiSpec.ts';
import AdminSocialMediaService from '@/api/admin/AdminSocialMediaService.ts';

const route = useRoute();
const snackbarStore = useSnackbarStore();
const schoolId = ref<number>();
const school = ref<FetchOneSchoolResponse>();
const socialMedias: Ref<FetchSocialMediasResponse> = ref([]);

onMounted(() => {
  schoolId.value = parseInt(route.params.id as string);
  AdminSchoolService.fetchOneSchool(schoolId.value).then(response => {
    school.value = response.data;
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminFestivalManageListPage.path);
      snackbarStore.showError('해당 학교를 찾을 수 없습니다.');
    } else throw e;
  });
  AdminSocialMediaService.fetchSchoolSocialMedias(schoolId.value).then(response => {
    socialMedias.value = response.data;
  });
});

</script>

<template>
  <v-container
    class="pa-10 ma-10 pt-0"
  >
    <h1 class="my-2">
      학교 상세 페이지
    </h1>

    <div>
      <v-row>
        <v-col :cols="5">
          <h3 class="my-2 pt-5">
            학교 정보
          </h3>
          <v-card>
            <v-card-item
              class="px-8 py-2"
            >
              <div class="py-2">
                <v-text-field
                  variant="outlined"
                  label="ID"
                  :readonly="true"
                  :model-value="school?.id"
                />
                <v-text-field
                  variant="outlined"
                  label="이름"
                  :readonly="true"
                  :model-value="school?.name"
                />
                <v-text-field
                  variant="outlined"
                  label="도메인"
                  :readonly="true"
                  :model-value="school?.domain"
                />
                <v-text-field
                  variant="outlined"
                  label="지역"
                  :readonly="true"
                  :model-value="school?.region"
                />
                <v-text-field
                  variant="outlined"
                  label="로고 URL"
                  :readonly="true"
                  :model-value="school?.logoUrl"
                />
                <v-text-field
                  variant="outlined"
                  label="백그라운드 이미지 URL"
                  :readonly="true"
                  :model-value="school?.backgroundImageUrl"
                />
              </div>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col :cols="7">
          <h3 class="my-2 pt-5">
            소셜미디어 목록
          </h3>
          <v-table>
            <thead>
            <tr>
              <th id="id">
                ID
              </th>
              <th id="socialMediaType">
                소셜미디어 타입
              </th>
              <th id="name">
                이름
              </th>
              <th id="edit">
                수정/삭제
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="socialMedia in socialMedias"
              :key="socialMedia.id"
            >
              <td>{{ socialMedia.id }}</td>
              <td>{{ socialMedia.socialMediaType }}</td>
              <td>{{ socialMedia.name }}</td>
              <td>
                <v-icon
                  class="mr-2"
                  icon="mdi-pencil"
                  color="grey-darken-3"
                  @click="$router.push({
                    name: RouterPath.Admin.AdminSocialMediaManageEditView.name,
                    params: { id: socialMedia.id }
                  })"
                />
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </div>

    <div>
      <h3 class="my-2 pt-5">
        학교 관리
      </h3>
      <v-row>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
            @click="$router.push(RouterPath.Admin.AdminSchoolManageEditPage)"
          >
            <v-card-item>
              <span class="mdi mdi-pencil-outline" />
              학교 수정/삭제
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div>
      <h3 class="my-2 pt-5">
        소셜미디어 관리
      </h3>
      <v-row>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
            @click="$router.push(RouterPath.Admin.AdminSchoolSocialMediaManageCreateView)"
          >
            <v-card-item>
              <span class="mdi mdi-plus-box-multiple-outline" />
              소셜미디어 추가
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
