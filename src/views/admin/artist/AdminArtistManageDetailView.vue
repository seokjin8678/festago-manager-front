<script setup lang="ts">

import RouterPath from '@/router/RouterPath.ts';
import { onMounted, Ref, ref } from 'vue';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import AdminSocialMediaService from '@/api/admin/AdminSocialMediaService.ts';
import { useRoute } from 'vue-router';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import AdminArtistService from '@/api/admin/AdminArtistService.ts';
import { FetchOneArtistResponse } from '@/api/spec/artist/FetchOneArtistApiSpec.ts';
import { FetchSocialMediasResponse } from '@/api/spec/socialmedia/FetchSocialMediasApiSpec.ts';
import ReadonlyField from '@/components/form/textfield/ReadonlyField.vue';
import ReadonlyForm from '@/components/form/ReadonlyForm.vue';
import SimpleTable from '@/components/table/SimpleTable.vue';
import ActionButton from '@/components/tab/ActionButton.vue';
import ActionTab from '@/components/tab/ActionTab.vue';

const route = useRoute();
const snackbarStore = useSnackbarStore();
const artistId = ref<number>();
const artist = ref<FetchOneArtistResponse>();
const socialMedias: Ref<FetchSocialMediasResponse> = ref([]);

onMounted(() => {
  artistId.value = parseInt(route.params.id as string);
  AdminArtistService.fetchOneArtist(artistId.value).then(response => {
    artist.value = response.data;
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminArtistManageListView.path);
      snackbarStore.showError('해당 아티스트를 찾을 수 없습니다.');
    } else throw e;
  });
  AdminSocialMediaService.fetchArtistSocialMedias(artistId.value).then(response => {
    socialMedias.value = response.data;
  });
});

</script>

<template>
  <v-container
    class="pa-10 ma-10 pt-0"
  >
    <h1 class="my-2">
      아티스트 상세 페이지
    </h1>

    <v-row>
      <v-col :cols="5">
        <ReadonlyForm title="아티스트 정보">
          <ReadonlyField label="ID" :value="artist?.id" />
          <ReadonlyField label="이름" :value="artist?.name" />
          <ReadonlyField label="도메인" :value="artist?.profileImageUrl" />
          <ReadonlyField label="지역" :value="artist?.backgroundImageUrl" />
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

    <ActionTab title="아티스트 관리">
      <ActionButton
        name="아티스트 수정/삭제"
        icon="mdi-pencil-outline"
        @click="$router.push(RouterPath.Admin.AdminArtistManageEditView)"
      />
    </ActionTab>

    <ActionTab title="소셜미디어 관리">
      <ActionButton
        name="소셜미디어 추가"
        icon="mdi-plus-box-multiple-outline"
        @click="$router.push(RouterPath.Admin.AdminArtistSocialMediaManageCreateView)"
      />
    </ActionTab>
  </v-container>
</template>
