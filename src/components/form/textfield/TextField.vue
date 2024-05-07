<script setup lang="ts">
const model = defineModel<string | number | undefined>({ required: true });

interface Props {
  label: string,
  type?: string
  errorMessages?: string | readonly string[] | null;
  placeholder?: string | undefined;
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  errorMessages: '',
  placeholder: '',
  readonly: false
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
    :readonly="props.readonly"
  />
</template>

<style scoped>

</style>
