<script setup lang="ts">

import { Artist } from '@/components/dialog/ArtistSelectDialog.vue';

const artists = defineModel<Map<number, Artist>>('artists', { required: true });

interface Props {
  errorMessages?: string | readonly string[] | null;
}

const props = withDefaults(defineProps<Props>(), {
  errorMessages: '',
});

const emits = defineEmits<{
  (e: 'removeCallback', artist: Artist): void
}>();

const removeArtist = (artist: Artist) => {
  artists.value.delete(artist.id);
  emits('removeCallback', artist);
};
</script>

<template>
  <v-text-field
    class="mb-3"
    :readonly="true"
    model-value=" "
    label="아티스트 목록"
    variant="outlined"
    :error-messages="props.errorMessages"
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
  </v-text-field>
</template>
