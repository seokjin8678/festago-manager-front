<script setup lang="ts">

import { onMounted, ref } from 'vue';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import { useRoute } from 'vue-router';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { useField, useForm } from 'vee-validate';
import AdminStageService from '@/api/admin/AdminStageService.ts';
import EditForm from '@/components/form/EditForm.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { number, object, string } from 'zod';
import ArtistSearchDialog, { Artist } from '@/components/dialog/ArtistSelectDialog.vue';
import ArtistsField from '@/components/form/textfield/ArtistsField.vue';

type UpdateStageForm = {
  startTime: string,
  ticketOpenTime: string,
  artistIds: number[],
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
      startTime: string({
        required_error: '공연 시작 시간은 필수입니다.',
      }),
      ticketOpenTime: string({
        required_error: '티켓 오픈 시간은 필수입니다.',
      }),
      artistIds: number().array(),
    }),
  ),
});
const startTimeField = useField('startTime');
const ticketOpenTimeField = useField('ticketOpenTime');
const artistIdsField = useField<number[]>('artistIds');
const showArtistSelectDialog = ref(false);

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

const onDeleteSubmit = () => {
  AdminStageService.deleteStage(stageId.value!).then(() => {
    snackbarStore.showSuccess('공연이 삭제되었습니다.');
    router.back();
  }).catch(e => {
    if (e instanceof FestagoError) {
      snackbarStore.showError(e.message);
    } else throw e;
  });
};

</script>

<template>
  <ArtistSearchDialog
    v-model:artists="artists"
    v-model:show-dialog="showArtistSelectDialog"
    @append-callback="artist => artistIdsField.value.value.push(artist.id)"
  />
  <EditForm
    form-title="공연 수정/삭제"
    :loading="isSubmitting"
    :on-update-submit="onUpdateSubmit"
    :on-delete-submit="onDeleteSubmit"
    :is-touched="meta.dirty"
  >
    <ArtistsField
      :artists="artists"
      :error-messages="artistIdsField.errorMessage.value"
      @remove-callback="_ => artistIdsField.value.value = [...artists.keys()]"
      @click="showArtistSelectDialog = true"
    />
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
