<script setup lang="ts">
import { ref, watch } from 'vue';
import AdminImageUploadService from '@/api/admin/AdminImageUploadService.ts';
import FestagoError from '@/api/FestagoError.ts';
import { FileOwnerType } from '@/type/upload/FileOwnerType.ts';
import Toast from '@/utils/Toast.ts';

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
    Toast.success('이미지가 업로드 되었습니다!');
    showDialog.value = false;
  }).catch(e => {
    if (e instanceof FestagoError) {
      Toast.error(e.message);
    } else throw e;
  }).finally(() => {
    uploadImageLoading.value = false;
  });
}

const rules = [(files: File[]) => {
  if (!files || files.length == 0) return true; // image is optional
  if (files[0].size > 5_000_000) return '이미지의 크기는 5MB 까지 가능합니다.';
  return true;
}];

</script>

<template>
  <v-dialog
    v-model="showDialog"
    max-width="500"
  >
    <v-card class="pa-5">
      <v-card-title class="text-h5 text-center">{{ props.title }}</v-card-title>
      <v-file-input
        label="이미지 파일 업로드"
        :show-size="true"
        v-model="images"
        prepend-icon="mdi-file-image-outline"
        accept="image/png, image/jpeg"
        :rules="rules"
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
