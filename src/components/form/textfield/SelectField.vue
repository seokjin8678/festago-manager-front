<script setup lang="ts">

const model = defineModel<string | number>('v-model', { required: true });

interface Props {
  label: string,
  errorMessages?: string | readonly string[] | null;
  items: readonly string[] | readonly number[]
}

const props = withDefaults(defineProps<Props>(), {
  errorMessages: '',
});
</script>

<template>
  <v-select
    class="mb-3"
    v-model="model"
    :error-messages="props.errorMessages"
    :items="props.items"
    variant="outlined"
    label="지역"
  />
</template>

