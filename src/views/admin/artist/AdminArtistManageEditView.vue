<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useRoute } from 'vue-router';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import RouterPath from '@/router/RouterPath.ts';
import AdminArtistService from '@/api/admin/AdminArtistService.ts';
import { UpdateArtistRequest } from '@/api/spec/artist/UpdateArtistApiSpec.ts';
import EditForm from '@/components/form/EditForm.vue';

const route = useRoute();
const snackbarStore = useSnackbarStore();

onMounted(() => {
  artistId.value = parseInt(route.params.id as string);
  AdminArtistService.fetchOneArtist(artistId.value).then(response => {
    resetForm({ values: response.data });
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminArtistManageListPage.path);
      snackbarStore.showError('해당 아티스트를 찾을 수 없습니다.');
    } else throw e;
  });
});

const { isSubmitting, meta, resetForm, setErrors, handleSubmit } = useForm<UpdateArtistRequest>({
  validationSchema: {
    name(value: string) {
      if (!value) return '아티스트 이름은 필수입니다.';
      return true;
    },
    profileImageUrl(value: string) {
      if (!value) return '프로필 이미지 URL은 필수입니다.';
      return true;
    },
    backgroundImageUrl(value: string) {
      if (!value) return '백그라운드 이미지 URL은 필수입니다.';
      return true;
    },
  },
});

const onUpdateSubmit = handleSubmit(async request => {
  try {
    await AdminArtistService.updateArtist(artistId.value!, request);
    snackbarStore.showSuccess('아티스트가 수정되었습니다.');
    resetForm({ values: request });
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
  AdminArtistService.deleteArtist(artistId.value!).then(() => {
    snackbarStore.showSuccess('아티스트가 삭제되었습니다.');
    router.push(RouterPath.Admin.AdminArtistManageListPage.path);
  }).catch(e => {
    if (e instanceof FestagoError) {
      snackbarStore.showError(e.message);
    } else throw e;
  });
}

const artistId = ref<number>();
const nameField = useField<string>('name');
const profileImageUrlField = useField<string>('profileImageUrl');
const backgroundImageUrlField = useField<string>('backgroundImageUrl');
</script>

<template>
  <EditForm
    form-title="아티스트 수정/삭제"
    :on-update-submit="onUpdateSubmit"
    :on-delete-submit="onDeleteSubmit"
    :loading="isSubmitting"
    :is-touched="meta.dirty"
  >
    <v-text-field
      class="mb-3"
      variant="outlined"
      label="ID"
      :model-value="artistId"
      :readonly="true"
    />
    <v-text-field
      class="mb-3"
      v-model="nameField.value.value"
      :error-messages="nameField.errorMessage.value"
      placeholder="아티스트 이름"
      variant="outlined"
      label="아티스트 이름"
    />
    <v-text-field
      class="mb-3"
      v-model="profileImageUrlField.value.value"
      :error-messages="profileImageUrlField.errorMessage.value"
      placeholder="https://festa-go.site/profile-image.png"
      variant="outlined"
      label="아티스트 프로필 이미지 URL"
    />
    <v-text-field
      class="mb-3"
      v-model="backgroundImageUrlField.value.value"
      :error-messages="backgroundImageUrlField.errorMessage.value"
      placeholder="https://festa-go.site/background-image.png"
      variant="outlined"
      label="아티스트 백그라운드 이미지 URL"
    />
  </EditForm>
</template>
