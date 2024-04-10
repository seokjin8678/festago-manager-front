<script setup lang="ts">

const value = defineModel<string | number | undefined | null>('value', { required: true });
const props = defineProps<{
  label: string,
}>();
</script>

<template>
  <v-text-field
    :label="props.label"
    :model-value="value"
    variant="outlined"
    :readonly="true"
  />
</template>
