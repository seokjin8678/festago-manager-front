<script setup lang="ts">

const showDialog = defineModel<boolean>({ required: true });
const props = defineProps<{
  dialogTitle: string,
  confirmText: string,
  confirmAction: () => void
}>();

</script>

<template>
  <v-dialog
    v-model="showDialog"
    max-width="500"
  >
    <v-card class="pa-5">
      <v-card-title class="text-h5 text-center">
        {{ props.dialogTitle }}
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text="취소"
          color="blue-darken-1"
          variant="text"
          @click="showDialog = false"
        />
        <v-btn
          :text="props.confirmText"
          color="red-darken-1"
          variant="text"
          @click="props.confirmAction"
        />
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
