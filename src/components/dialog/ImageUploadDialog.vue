<script setup lang="ts">
import { ref, watch } from 'vue';
import AdminImageUploadService from '@/api/admin/AdminImageUploadService.ts';
import FestagoError from '@/api/FestagoError.ts';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { FileOwnerType } from '@/type/upload/FileOwnerType.ts';

const snackbarStore = useSnackbarStore();
const showDialog = defineModel<boolean>({ required: true });
const props = defineProps<{
  title: string,
  ownerId?: number,
  ownerType?: FileOwnerType,
}>();
const emits = defineEmits<(e: 'uploadCallback', uploadUri: string) => void>();
const images = ref<File[]>([]);
const uploadImageLoading = ref(false);

// dialog 닫을시 첨부파일 제거
watch(showDialog, (newValue, _) => {
  if (!newValue) {
    images.value.splice(0);
  }
});

function uploadImage() {
  uploadImageLoading.value = true;
  AdminImageUploadService.uploadImage({
    image: images.value[0],
    ownerId: props.ownerId,
    ownerType: props.ownerType,
  }).then(res => {
    emits('uploadCallback', res.data.uploadUri);
    images.value.splice(0);
    snackbarStore.showSuccess('이미지가 업로드 되었습니다!');
    showDialog.value = false;
  }).catch(e => {
    if (e instanceof FestagoError) {
      snackbarStore.showError(e.message);
    } else throw e;
  }).finally(() => {
    uploadImageLoading.value = false;
  });
}

</script>

<template>
  <v-dialog
    v-model="showDialog"
    max-width="500"
  >
    <v-card class="pa-5">
      <v-card-title class="text-h5 text-center">{{ props.title }}</v-card-title>
      <v-file-input
        label="File input"
        :show-size="true"
        v-model="images"
      />
      <v-btn
        @click="uploadImage"
        text="업로드"
        :loading="uploadImageLoading"
        :disabled="images.length === 0"
      />
    </v-card>
  </v-dialog>
</template>
