<script setup lang="ts">
import CreateForm from '@/components/form/CreateForm.vue';
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { useRoute } from 'vue-router';
import AdminStageService from '@/api/admin/AdminStageService.ts';
import FestagoError from '@/api/FestagoError.ts';
import AdminArtistService from '@/api/admin/AdminArtistService.ts';

type CreateStageForm = {
  startTime: string,
  ticketOpenTime: string
}

type Artist = {
  id: number,
  name: string
}

const route = useRoute();
const snackbarStore = useSnackbarStore();
const { isSubmitting, handleSubmit, setErrors, handleReset } = useForm<CreateStageForm>({
  validationSchema: {
    startTime(value: string) {
      if (!value) return '공연 시작 시간은 필수입니다.';
      return true;
    },
    ticketOpenTime(value: string) {
      if (!value) return '티켓 오픈 시간은 필수입니다.';
      return true;
    },
  },
});
const startTimeField = useField('startTime');
const ticketOpenTimeField = useField('ticketOpenTime');

const fetchedArtists = ref<Artist[]>([]);
const artists = ref(new Map<number, Artist>());
const showArtistSelectDialog = ref(false);
const fetchArtistsLoading = ref(false);
const artistSearchKeyword = ref('');

function fetchArtists() {
  AdminArtistService.fetchArtists().then(response => {
    fetchedArtists.value = response.data.map(artist => (
      { id: artist.id, name: artist.name }
    ));
  });
}

function putArtist(artist: Artist) {
  if (artists.value.has(artist.id)) {
    snackbarStore.showError('이미 등록된 아티스트 입니다.');
  } else {
    artists.value.set(artist.id, artist);
  }
}

function removeArtist(artist: Artist) {
  artists.value.delete(artist.id);
}

const onSubmit = handleSubmit(async form => {
  try {
    await AdminStageService.createStage({
      festivalId: parseInt(route.params.id[0]),
      startTime: form.startTime,
      ticketOpenTime: form.ticketOpenTime,
      artistIds: [...artists.value.keys()],
    });
    handleReset();
    snackbarStore.showSuccess('공연이 생성되었습니다!');
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

  <CreateForm
    :on-submit="onSubmit"
    :loading="isSubmitting"
    form-title="공연 추가"
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
              @click:close="() => removeArtist(artist)"
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
  </CreateForm>
</template>
