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
  AdminArtistService.fetchOneArtist((parseInt(route.params.id as string))).then(response => {
    const { id, name, profileImage } = response.data;
    artistId.value = id;
    nameField.resetField({
      value: name,
    });
    profileImageField.resetField({
      value: profileImage,
    });
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminArtistManageListPage.path);
      snackbarStore.showError('해당 아티스트를 찾을 수 없습니다.');
    } else throw e;
  });
});

const { handleSubmit, isFieldDirty } = useForm<UpdateArtistRequest>({
  validationSchema: {
    name(value: string) {
      if (!value) return '아티스트 이름은 필수입니다.';
      return true;
    },
    profileImage(value: string) {
      if (!value) return '이미지 URL은 필수입니다.';
      return true;
    },
  },
});

const onUpdateSubmit = handleSubmit(request => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  if (!isFieldDirty('name') && !isFieldDirty('profileImage')) {
    snackbarStore.showError('아무것도 수정되지 않았습니다.');
    return;
  }
  AdminArtistService.updateArtist(artistId.value!, request).then(() => {
    loading.value = false;
    snackbarStore.showSuccess('아티스트가 수정되었습니다.');
    nameField.resetField({
      value: nameField.value.value,
    });
    profileImageField.resetField({
      value: profileImageField.value.value,
    });
  }).catch(e => {
    if (e instanceof FestagoError) {
      snackbarStore.showError(e.message);
    } else throw e;
  });
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
const profileImageField = useField<string>('profileImage');
const loading = ref(false);
</script>

<template>
  <EditForm
    form-title="아티스트 수정/삭제"
    :on-update-submit="onUpdateSubmit"
    :on-delete-submit="onDeleteSubmit"
    :loading="loading"
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
      v-model="profileImageField.value.value"
      :error-messages="profileImageField.errorMessage.value"
      placeholder="https://festa-go.site/image.png"
      variant="outlined"
      label="아티스트 이미지 URL"
    />
  </EditForm>
</template>
