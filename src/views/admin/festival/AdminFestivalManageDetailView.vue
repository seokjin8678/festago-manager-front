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
import { FetchFestivalStagesResponse } from '@/api/spec/festival/FetchFestivalStagesApiSpec.ts';
import ReadonlyForm from '@/components/form/ReadonlyForm.vue';
import ReadonlyField from '@/components/form/textfield/ReadonlyField.vue';
import SimpleTable from '@/components/table/SimpleTable.vue';
import ActionTab from '@/components/tab/ActionTab.vue';
import ActionButton from '@/components/tab/ActionButton.vue';

const route = useRoute();
const snackbarStore = useSnackbarStore();

onMounted(() => {
  festivalId.value = parseInt(route.params.id as string);
  AdminFestivalService.fetchOneFestival(festivalId.value).then(response => {
    festival.value = response.data;
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminFestivalManageListView.path);
      snackbarStore.showError('해당 축제를 찾을 수 없습니다.');
    } else throw e;
  });
  AdminFestivalService.fetchFestivalStages(festivalId.value).then(response => {
    stages.value = response.data;
  });
});

const festivalId = ref<number>();
const festival = ref<FetchOneFestivalResponse>();
const stages = ref<FetchFestivalStagesResponse>([]);

</script>

<template>
  <v-container
    class="pa-10 ma-10 pt-0"
  >
    <h1 class="my-2">
      축제 상세 페이지
    </h1>

    <v-row>
      <v-col :cols="5">
        <ReadonlyForm title="축제 정보">
          <ReadonlyField label="ID" :value="festival?.id" />
          <ReadonlyField label="이름" :value="festival?.name" />
          <ReadonlyField label="학교 이름" :value="festival?.schoolName" />
          <ReadonlyField label="시작일" :value="festival?.startDate" />
          <ReadonlyField label="종료일" :value="festival?.endDate" />
          <ReadonlyField label="포스터 이미지 URL" :value="festival?.posterImageUrl" />
          <ReadonlyField label="생성일자" :value="festival?.createdAt" />
          <ReadonlyField label="수정일자" :value="festival?.updatedAt" />
        </ReadonlyForm>
      </v-col>
      <v-col :cols="7">
        <SimpleTable
          title="공연 정보"
          :thead="['시작시간', '티켓 오픈 시간', '아티스트 목록', '수정/삭제']"
        >
          <tr v-for="stage in stages">
            <td>{{ stringToDateString(stage.startDateTime) }}</td>
            <td>{{ stringToDateString(stage.ticketOpenTime) }}</td>
            <td>{{ stage.artists.map(artist => artist.name).join(', ') }}</td>
            <td>
              <v-icon
                class="mr-2"
                icon="mdi-pencil"
                color="grey-darken-3"
                @click="$router.push({
                    name: RouterPath.Admin.AdminStageManageEditView.name,
                    params: { id: stage.id }
                  })"
              />
            </td>
          </tr>
        </SimpleTable>
      </v-col>
    </v-row>

    <ActionTab title="축제 관리">
      <ActionButton
        name="축제 수정/삭제"
        icon="mdi-pencil-outline"
        @action="$router.push(RouterPath.Admin.AdminFestivalManageEditView)"
      />
    </ActionTab>

    <ActionTab title="공연 관리">
      <ActionButton
        name="공연 추가"
        icon="mdi-plus-box-multiple-outline"
        @action="$router.push(RouterPath.Admin.AdminStageManageCreateView)"
      />
    </ActionTab>
  </v-container>
</template>
