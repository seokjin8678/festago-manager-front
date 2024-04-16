<script setup lang="ts">
import { router } from '@/router';
import RouterPath from '@/router/RouterPath.ts';
import RootAdminService from '@/api/admin/RootAdminService.ts';
import FestagoError from '@/api/FestagoError.ts';
import { ref } from 'vue';
import ConfirmDialog from '@/components/dialog/ConfirmDialog.vue';
import ActionButton from '@/components/tab/ActionButton.vue';
import ActionTab from '@/components/tab/ActionTab.vue';

const showLogDialog = ref(false);
const dialogAction = ref(() => {
});

function showServerBuildTime() {
  RootAdminService.fetchServerBuildTime().then(response => {
    alert(response.data);
  });
}

function requestInfoLog() {
  RootAdminService.logInfo().catch(e => {
    if (e instanceof FestagoError) {
      alert('Info 로그를 서버에 남겼습니다.');
    } else throw e;
  });
}

function requestWarnLog() {
  RootAdminService.logWarn().catch(e => {
    if (e instanceof FestagoError) {
      alert('Warn 로그를 서버에 남겼습니다.');
    } else throw e;
  });
}

function requestErrorLog() {
  RootAdminService.logError().catch(e => {
    if (e instanceof FestagoError) {
      alert('Error 로그를 서버에 남겼습니다.');
    } else throw e;
  });
}

</script>

<template>
  <v-container
    class="px-12 mt-2"
  >
    <h1 class="my-2">
      루트 어드민 관리 페이지
    </h1>
    <ConfirmDialog
      dialog-title="로그를 남길까요?"
      confirm-text="네"
      :confirm-action="dialogAction"
      v-model="showLogDialog"
    />

    <ActionTab title="디버깅 기능">
      <ActionButton
        name="서버 빌드 시간 조회"
        icon="mdi-clock-outline"
        @click="showServerBuildTime"
      />
      <ActionButton
        name="INFO 로그 생성"
        icon="mdi-alert-outline"
        @click="showLogDialog = true; dialogAction = requestInfoLog"
      />
      <ActionButton
        name="WARN 로그 생성"
        icon="mdi-alert-outline"
        @click="showLogDialog = true; dialogAction = requestWarnLog"
      />
      <ActionButton
        name="ERROR 로그 생성"
        icon="mdi-alert-outline"
        @click="showLogDialog = true; dialogAction = requestErrorLog"
      />
    </ActionTab>

    <ActionTab title="어드민 계정 기능">
      <ActionButton
        name="어드민 계정 생성"
        icon="mdi-account-plus-outline"
        @click="router.push(RouterPath.Admin.AdminAccountCreateView.path)"
      />
      <ActionButton
        name="어드민 계정 목록"
        icon="mdi-format-list-bulleted"
        @click="console.log('WIP')"
      />
    </ActionTab>

    <ActionTab title="축제 관리 기능">
      <ActionButton
        name="모든 FestivalQueryInfo 재갱신"
        icon="mdi-refresh"
        @click="console.log('WIP')"
      />
      <ActionButton
        name="특정 FestivalQueryInfo 재갱신"
        icon="mdi-refresh"
        @click="console.log('WIP')"
      />
    </ActionTab>

    <ActionTab title="공연 관리 기능">
      <ActionButton
        name="모든 StageQueryInfo 재갱신"
        icon="mdi-refresh"
        @click="console.log('WIP')"
      />
      <ActionButton
        name="특정 StageQueryInfo 재갱신"
        icon="mdi-refresh"
        @click="console.log('WIP')"
      />
    </ActionTab>
  </v-container>
</template>
