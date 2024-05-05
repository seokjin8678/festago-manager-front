<script setup lang="ts">

const props = defineProps<{
  title: string,
}>();

</script>

<!-- 다음과 같이 사용할 것
<ActionTab title="공연 관리">
  <ActionButton
    name="공연 추가"
    icon="mdi-plus-box-multiple-outline"
    @action="$router.push(RouterPath.Admin.AdminStageManageCreatePage)"
  />
  <ActionButton
    name="공연 수정/삭제"
    icon="mdi-pencil-outline"
  />
</ActionTab>
-->
<template>
  <h3 class="my-2 pt-5">
    {{ props.title }}
  </h3>
  <v-row>
    <slot></slot>
  </v-row>
</template>

