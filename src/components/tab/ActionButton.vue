<script setup lang="ts">

const props = defineProps<{
  name: string,
  icon: string
}>();
const emits = defineEmits<{
  (e: 'action'): void
}>();
</script>

<!-- 다음과 같이 사용할 것
<ActionButton
  name="공연 추가"
  icon="mdi-plus-box-multiple-outline"
  @action="$router.push(RouterPath.Admin.AdminStageManageCreatePage)"
/>
-->
<template>
  <v-col :cols="3">
    <v-card
      class="py-2"
      variant="outlined"
      @click="emits('action')"
    >
      <v-card-item>
        <span v-if="props.icon" :class="`mdi ${props.icon}`" />
        {{ props.name }}
      </v-card-item>
    </v-card>
  </v-col>
</template>
