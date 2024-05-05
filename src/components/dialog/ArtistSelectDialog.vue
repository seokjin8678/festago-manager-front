<script setup lang="ts">

import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { ref } from 'vue';
import AdminArtistService from '@/api/admin/AdminArtistService.ts';

export type Artist = {
  id: number,
  name: string
}
const snackbarStore = useSnackbarStore();

const artists = defineModel<Map<number, Artist>>('artists', { required: true });
const showDialog = defineModel<boolean>('showDialog', { required: true });
const emits = defineEmits<{
  (e: 'appendCallback', artist: Artist): void
}>();
const fetchedArtists = ref<Artist[]>([]);
const artistSearchKeyword = ref('');
const fetchArtistsLoading = ref(false);

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
  emits('appendCallback', artist);
};

</script>

<template>
  <v-dialog
    v-model="showDialog"
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
</template>
