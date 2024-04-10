<script setup lang="ts">

const props = defineProps<{
  title: string,
  thead: string[]
}>();

</script>

<!-- 다음과 같이 사용할 것
<SimpleTable
  title="공연 정보"
  :thead="['시작시간', '티켓 오픈 시간', '아티스트 목록']"
>
  <tr v-for="stage in stages">
    <td>{{ stringToDateString(stage.startDateTime) }}</td>
    <td>{{ stringToDateString(stage.ticketOpenTime) }}</td>
    <td>{{ stage.artists.map(artist => artist.name).join(', ') }}</td>
  </tr>
</SimpleTable>
-->
<template>
  <h3 class="my-2 pt-5">{{ props.title }}</h3>
  <v-table>
    <thead>
    <tr>
      <th v-for="head in props.thead" :id="head">
        {{ head }}
      </th>
    </tr>
    </thead>
    <tbody>
    <slot></slot>
    </tbody>
  </v-table>
</template>
