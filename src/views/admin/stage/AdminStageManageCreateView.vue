<script setup lang="ts">
import CreateForm from '@/components/form/CreateForm.vue';
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import Toast from '@/utils/Toast.ts';
import { useRoute } from 'vue-router';
import AdminStageService from '@/api/admin/AdminStageService.ts';
import FestagoError from '@/api/FestagoError.ts';
import ArtistSearchDialog, { Artist } from '@/components/dialog/ArtistSelectDialog.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { object } from 'zod';
import ArtistsField from '@/components/form/textfield/ArtistsField.vue';
import TextField from '@/components/form/textfield/TextField.vue';
import FormValidator from '@/utils/FormValidator.ts';

type CreateStageForm = {
  startTime: string,
  ticketOpenTime: string,
}

const route = useRoute();
const { isSubmitting, handleSubmit, setErrors, handleReset } = useForm<CreateStageForm>({
  validationSchema: toTypedSchema(
    object({
      startTime: FormValidator.Stage.startTime,
      ticketOpenTime: FormValidator.Stage.ticketOpenTime,
    }),
  ),
});
const startTimeField = useField<string>('startTime');
const ticketOpenTimeField = useField<string>('ticketOpenTime');

const artists = ref(new Map<number, Artist>());
const showArtistSelectDialog = ref(false);

const onSubmit = handleSubmit(async form => {
  try {
    await AdminStageService.createStage({
      festivalId: parseInt(route.params.id as string),
      startTime: form.startTime,
      ticketOpenTime: form.ticketOpenTime,
      artistIds: [...artists.value.keys()],
    });
    handleReset();
    artists.value.clear();
    Toast.success('공연이 생성되었습니다!');
  } catch (e) {
    if (e instanceof FestagoError) {
      if (e.isValidError()) {
        setErrors(e.result);
      } else {
        Toast.error(e.message);
      }
    } else throw e;
  }
});
</script>

<template>
  <ArtistSearchDialog
    v-model:artists="artists"
    v-model:show-dialog="showArtistSelectDialog"
  />
  <CreateForm
    :on-submit="onSubmit"
    :loading="isSubmitting"
    form-title="공연 추가"
  >
    <ArtistsField
      @click="showArtistSelectDialog = true"
      :artists="artists"
    />
    <TextField
      label="공연 시작 시간"
      type="datetime-local"
      v-model="startTimeField.value.value"
      :error-messages="startTimeField.errorMessage.value"
    />
    <TextField
      label="티켓 오픈 시간"
      type="datetime-local"
      v-model="ticketOpenTimeField.value.value"
      :error-messages="ticketOpenTimeField.errorMessage.value"
    />
  </CreateForm>
</template>
