<script setup lang="ts">

import { onMounted, ref } from 'vue';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import { useRoute } from 'vue-router';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { useField, useForm } from 'vee-validate';
import AdminStageService from '@/api/admin/AdminStageService.ts';
import EditForm from '@/components/form/EditForm.vue';
import AdminArtistService from '@/api/admin/AdminArtistService.ts';
import { toTypedSchema } from '@vee-validate/zod';
import { number, object, string } from 'zod';

type UpdateStageForm = {
  startTime: string,
  ticketOpenTime: string,
  artistIds: number[],
}

type Artist = {
  id: number,
  name: string
}

const route = useRoute();
const snackbarStore = useSnackbarStore();
const stageId = ref<number>();
const artists = ref(new Map<number, Artist>());

onMounted(() => {
  stageId.value = parseInt(route.params.id as string);
  AdminStageService.fetchOneStage(stageId.value).then(response => {
    const stageResponse = response.data;
    resetForm({
      values: {
        startTime: stageResponse.startDateTime,
        ticketOpenTime: stageResponse.ticketOpenTime,
        artistIds: stageResponse.artists.map(it => it.id),
      },
    });
    stageResponse.artists.forEach(it => artists.value.set(it.id, it));
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.back();
      snackbarStore.showError('해당 공연을 찾을 수 없습니다.');
    } else throw e;
  });
});
const { isSubmitting, meta, resetForm, setErrors, handleSubmit } = useForm<UpdateStageForm>({
  validationSchema: toTypedSchema(
    object({
      startTime: string().min(1),
      ticketOpenTime: string().min(1),
      artistIds: number().array(),
    }),
  ),
});
const startTimeField = useField('startTime');
const ticketOpenTimeField = useField('ticketOpenTime');
const artistIdsField = useField<number[]>('artistIds');
const fetchedArtists = ref<Artist[]>([]);
const showArtistSelectDialog = ref(false);
const fetchArtistsLoading = ref(false);
const artistSearchKeyword = ref('');

function fetchArtists() {
  AdminArtistService.fetchArtists({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
  }, {
    searchKeyword: artistSearchKeyword.value,
    searchFilter: 'name',
  }).then(response => {
    fetchedArtists.value = response.data.content.map(artist => (
      { id: artist.id, name: artist.name }
    ));
  });
}

const putArtist = (artist: Artist) => {
  if (artists.value.has(artist.id)) {
    snackbarStore.showError('이미 등록된 아티스트 입니다.');
    return;
  }
  artists.value.set(artist.id, artist);
  artistIdsField.value.value.push(artist.id);
};

const removeArtist = (artist: Artist) => {
  artists.value.delete(artist.id);
  artistIdsField.value.value = [...artists.value.keys()];
};

const onUpdateSubmit = handleSubmit(async form => {
  try {
    await AdminStageService.updateStage(stageId.value!, form);
    resetForm({ values: form });
    snackbarStore.showSuccess('공연이 수정되었습니다.');
  } catch (e) {
    if (e instanceof FestagoError) {
      if (e.isValidError()) {
        setErrors(e.result);
      } else {
        snackbarStore.showError(e.message);
      }
    } else throw e;
  }
});

function onDeleteSubmit() {
  AdminStageService.deleteStage(stageId.value!).then(() => {
    snackbarStore.showSuccess('공연이 삭제되었습니다.');
    router.back();
  }).catch(e => {
    if (e instanceof FestagoError) {
      snackbarStore.showError(e.message);
    } else throw e;
  });
}

</script>

<template>
  <v-dialog
    v-model="showArtistSelectDialog"
    max-width="500"
  >
    <v-card class="pa-5">
      <v-card-title class="text-h5 text-center">
        아티스트 선택
      </v-card-title>
      <v-row :no-gutters="true" align="center">
        <v-col :cols="10">
          <v-text-field
            class="pa-2 ma-2"
            v-model="artistSearchKeyword"
            label="아티스트 이름"
            prepend-inner-icon="mdi-magnify"
            :single-line="true"
            variant="outlined"
            :hide-details="true"
            maxLength="50"
          />
        </v-col>
        <v-col :cols="2">
          <v-btn
            :loading="fetchArtistsLoading"
            :disabled="!(!!(artistSearchKeyword))"
            class="py-7 text-h6"
            color="blue"
            variant="flat"
            :block="true"
            text="검색"
            @click="fetchArtists"
          />
        </v-col>
      </v-row>

      <v-table class="text-center">
        <thead>
        <tr>
          <th id="name" class="text-center">
            이름
          </th>
          <th id="selectBtn" class="text-center" />
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="artist in fetchedArtists"
          :key="artist.id"
        >
          <td>{{ artist.name }}</td>
          <td>
            <v-btn
              @click="putArtist(artist)"
              text="선택"
            />
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-dialog>
  <EditForm
    form-title="공연 수정/삭제"
    :loading="isSubmitting"
    :on-update-submit="onUpdateSubmit"
    :on-delete-submit="onDeleteSubmit"
    :is-touched="meta.dirty"
  >
    <div>
      <p class="ml-2 ma-1 text-subtitle-2 text-grey-darken-2">아티스트 목록</p>
      <v-card
        class="pa-6 mb-6"
        variant="outlined"
        @click="showArtistSelectDialog = true"
      >
        <v-row>
          <v-col
            v-for="artist in artists.values()"
            :key="artist.id"
            class="py-1 pe-0"
            cols="auto"
          >
            <v-chip
              :closable="true"
              @click:close="removeArtist(artist)"
            >
              {{ artist.name }}
            </v-chip>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <v-text-field
      class="mb-3"
      type="datetime-local"
      v-model="startTimeField.value.value"
      :error-messages="startTimeField.errorMessage.value"
      variant="outlined"
      label="공연 시작 시간"
    />
    <v-text-field
      class="mb-3"
      type="datetime-local"
      v-model="ticketOpenTimeField.value.value"
      :error-messages="ticketOpenTimeField.errorMessage.value"
      variant="outlined"
      label="티켓 오픈 시간"
    />
  </EditForm>
</template>
