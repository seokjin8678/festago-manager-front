<script setup lang="ts">
import { ref } from 'vue';

const passwordVisible = ref(false);
const model = defineModel<string | number>({ required: true });

interface Props {
  label: string,
  errorMessages?: string | readonly string[] | null;
}

const props = withDefaults(defineProps<Props>(), {
  errorMessages: '',
});

</script>

<template>
  <v-text-field
    class="mb-3"
    :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
    :type="passwordVisible ? 'text' : 'password'"
    v-model="model"
    :error-messages="props.errorMessages"
    variant="outlined"
    :label="props.label"
    @click:append-inner="passwordVisible = !passwordVisible"
  />
</template>
