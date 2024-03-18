<script setup lang="ts">
import RouterPath from '@/router/RouterPath.ts';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { FetchOneFestivalResponse } from '@/api/spec/festival/FetchOneFestivalApiSpec.ts';
import AdminFestivalService from '@/api/admin/AdminFestivalService.ts';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { stringToDateString } from '@/utils/DateFormatUtil.ts';

const route = useRoute();
const snackbarStore = useSnackbarStore();

onMounted(() => {
  festivalId.value = parseInt(route.params.id as string);
  AdminFestivalService.fetchOneFestival(festivalId.value).then(response => {
    festival.value = response.data;
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminFestivalManageListPage.path);
      snackbarStore.showError('해당 축제를 찾을 수 없습니다.');
    } else throw e;
  });
});

const festivalId = ref<number>();
const festival = ref<FetchOneFestivalResponse>();

</script>

<template>
  <v-container
    class="pa-10 ma-10 pt-0"
  >
    <h1 class="my-2">
      축제 상세 페이지
    </h1>

    <div>
      <v-row>
        <v-col :cols="5">
          <h3 class="my-2 pt-5">
            축제 정보
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
                  :model-value="festival?.id"
                />
                <v-text-field
                  variant="outlined"
                  label="이름"
                  :readonly="true"
                  :model-value="festival?.name"
                />
                <v-text-field
                  variant="outlined"
                  label="학교 이름"
                  :readonly="true"
                  :model-value="festival?.schoolName"
                />
                <v-text-field
                  variant="outlined"
                  label="축제 시작일"
                  :readonly="true"
                  :model-value="festival?.startDate"
                />
                <v-text-field
                  variant="outlined"
                  label="축제 종료일"
                  :readonly="true"
                  :model-value="festival?.endDate"
                />
                <v-text-field
                  variant="outlined"
                  label="축제 포스터 URL"
                  :readonly="true"
                  :model-value="festival?.posterImageUrl"
                />
                <v-text-field
                  variant="outlined"
                  label="생성일자"
                  :readonly="true"
                  :model-value="stringToDateString(festival?.createdAt)"
                />
                <v-text-field
                  variant="outlined"
                  label="수정일자"
                  :readonly="true"
                  :model-value="stringToDateString(festival?.updatedAt)"
                />
              </div>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col :cols="7">
          <h3 class="my-2 pt-5">
            공연 정보
          </h3>
          <v-table>
            <thead>
            <tr>
              <th id="startTime">
                시작 시간
              </th>
              <th id="ticketOpenTime">
                티켓 오픈 시간
              </th>
              <th id="artists">
                아티스트 목록
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>2077-06-30T18:00:00</td>
              <td>2077-06-30T18:00:00</td>
              <td>장기하,아이유,에픽하이,장기하,아이유,에픽하이</td>
            </tr>
            <tr>
              <td>2077-06-30T18:00:00</td>
              <td>2077-06-30T18:00:00</td>
              <td>장기하,아이유,에픽하이</td>
            </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </div>

    <div>
      <h3 class="my-2 pt-5">
        축제 관리
      </h3>
      <v-row>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
            @click="$router.push(RouterPath.Admin.AdminFestivalManageEditPage)"
          >
            <v-card-item>
              <span class="mdi mdi-pencil-outline" />
              축제 수정/삭제
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div>
      <h3 class="my-2 pt-5">
        공연 관리
      </h3>
      <v-row>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
            @click="$router.push(RouterPath.Admin.AdminStageManageCreatePage)"
          >
            <v-card-item>
              <span class="mdi mdi-plus-box-multiple-outline" />
              공연 추가
            </v-card-item>
          </v-card>
        </v-col>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
          >
            <v-card-item>
              <span class="mdi mdi-pencil-outline" />
              공연 수정/삭제
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
