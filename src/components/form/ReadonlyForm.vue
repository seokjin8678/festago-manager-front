<script setup lang="ts">

const props = defineProps<{
  title: string,
}>();

</script>

<template>
  <h3 class="my-2 pt-5">{{ props.title }}</h3>
  <v-card>
    <v-card-item class="px-8 py-2">
      <div class="py-2">
        <slot></slot>
      </div>
    </v-card-item>
  </v-card>
</template>
