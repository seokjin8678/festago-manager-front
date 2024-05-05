<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  formTitle: string,
  onUpdateSubmit: (e?: Event) => any,
  onDeleteSubmit: () => void,
  loading: boolean,
  isTouched: boolean
}>();
const invalidForm = ref(false);
const showDeleteDialog = ref(false);

</script>

<template>
  <v-dialog
    v-model="showDeleteDialog"
    max-width="500"
  >
    <v-card class="pa-5">
      <v-card-title class="text-h5 text-center">
        정말로 삭제할까요?
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text="취소"
          color="blue-darken-1"
          variant="text"
          @click="showDeleteDialog = false"
        />
        <v-btn
          text="삭제"
          color="red-darken-1"
          variant="text"
          @click="onDeleteSubmit"
        />
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-form
    v-model="invalidForm"
    @submit.prevent="onUpdateSubmit"
  >
    <v-card
      class="mx-auto pa-3 pa-md-15 py-8 my-16 w-75"
      max-width="800"
      min-width="350"
      elevation="4"
    >
      <v-card-title class="mb-3 text-h4 text-center">
        {{ props.formTitle }}
      </v-card-title>
      <slot></slot>
      <v-btn
        :disabled="!invalidForm || !props.isTouched"
        :loading="loading"
        class="text-h6"
        type="submit"
        text="수정"
        color="blue"
        :block="true"
      />
      <v-btn
        :disabled="props.loading"
        class="text-h6 mt-4"
        text="삭제"
        color="red"
        :block="true"
        @click="showDeleteDialog = true"
      />
      <v-btn
        :disabled="props.loading"
        class="text-h6 mt-4"
        text="취소"
        color="grey"
        :block="true"
        @click="$router.go(-1)"
      />
    </v-card>
  </v-form>
</template>
