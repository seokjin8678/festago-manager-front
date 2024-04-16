<script setup lang="ts">
const model = defineModel<string | number>('v-model', { required: true });

interface Props {
  label: string,
  type?: string
  errorMessages?: string | readonly string[] | null;
  placeholder?: string | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  errorMessages: '',
  placeholder: '',
});
</script>

<template>
  <v-text-field
    class="mb-3"
    :type="props.type"
    variant="outlined"
    :label="props.label"
    :placeholder="props.placeholder"
    v-model="model"
    :error-messages="props.errorMessages"
  />
</template>

<style scoped>

</style>
