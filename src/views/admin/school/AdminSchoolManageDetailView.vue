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
import ReadonlyForm from '@/components/form/ReadonlyForm.vue';
import ReadonlyField from '@/components/form/textfield/ReadonlyField.vue';
import SimpleTable from '@/components/table/SimpleTable.vue';
import ActionTab from '@/components/tab/ActionTab.vue';
import ActionButton from '@/components/tab/ActionButton.vue';

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

    <v-row>
      <v-col :cols="5">
        <ReadonlyForm title="학교 정보">
          <ReadonlyField label="ID" :value="school?.id" />
          <ReadonlyField label="이름" :value="school?.name" />
          <ReadonlyField label="도메인" :value="school?.domain" />
          <ReadonlyField label="지역" :value="school?.region" />
          <ReadonlyField label="로고 URL" :value="school?.logoUrl" />
          <ReadonlyField label="백그라운드 이미지 URL" :value="school?.backgroundImageUrl" />
        </ReadonlyForm>
      </v-col>
      <v-col :cols="7">
        <SimpleTable
          title="소셜미디어 목록"
          :thead="['ID', '소셜미디어 타입', '이름', '수정/삭제']"
        >
          <tr v-for="socialMedia in socialMedias">
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
        </SimpleTable>
      </v-col>
    </v-row>

    <ActionTab title="학교 관리">
      <ActionButton
        name="학교 수정/삭제"
        icon="mdi-pencil-outline"
        @click="$router.push(RouterPath.Admin.AdminSchoolManageEditPage)"
      />
    </ActionTab>

    <ActionTab title="소셜미디어 관리">
      <ActionButton
        name="소셜미디어 추가"
        icon="mdi-plus-box-multiple-outline"
        @click="$router.push(RouterPath.Admin.AdminSchoolSocialMediaManageCreateView)"
      />
    </ActionTab>
  </v-container>
</template>
