<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  onSubmit: (e?: Event) => Promise<void | undefined>,
  formTitle: string,
  loading: boolean
}>();
const invalidForm = ref(false);

</script>

<template>
  <v-form
    v-model="invalidForm"
    @submit.prevent="props.onSubmit"
  >
    <v-card
      class="mx-auto pa-3 pa-md-15 py-8 my-16 w-75"
      max-width="800"
      min-width="350"
      elevation="4"
    >
      <v-card-title class="mb-3">
        <p class="text-h4 text-center">
          {{ props.formTitle }}
        </p>
      </v-card-title>
      <slot />
      <v-btn
        :disabled="!invalidForm"
        :loading="props.loading"
        class="text-h6"
        type="submit"
        text="생성"
        color="blue"
        :block="true"
      />
    </v-card>
  </v-form>
</template>
