<script setup lang="ts">
import { router } from '@/router';
import RouterPath from '@/router/RouterPath.ts';
import RootAdminService from '@/api/admin/RootAdminService.ts';
import FestagoError from '@/api/FestagoError.ts';
import { ref } from 'vue';
import ConfirmDialog from '@/components/dialog/ConfirmDialog.vue';

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
    <div>
      <h3 class="my-2 pt-5">
        디버깅 기능
      </h3>
      <v-row>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
            @click="showServerBuildTime"
          >
            <v-card-item>
              <span class="mdi mdi-pencil-outline" />
              서버 빌드 시간 조회
            </v-card-item>
          </v-card>
        </v-col>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
            @click="showLogDialog = true; dialogAction = requestInfoLog"
          >
            <v-card-item>
              <span class="mdi mdi-alert-outline" />
              INFO 로그 생성
            </v-card-item>
          </v-card>
        </v-col>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
            @click="showLogDialog = true; dialogAction = requestWarnLog"
          >
            <v-card-item>
              <span class="mdi mdi-alert-outline" />
              WARN 로그 생성
            </v-card-item>
          </v-card>
        </v-col>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
            @click="showLogDialog = true; dialogAction = requestErrorLog"
          >
            <v-card-item>
              <span class="mdi mdi-alert-outline" />
              ERROR 로그 생성
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <h3 class="my-2 pt-5">
        어드민 계정 기능
      </h3>
      <v-row>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
            @click="router.push(RouterPath.Admin.AdminAccountCreatePage.path)"
          >
            <v-card-item>
              <span class="mdi mdi-plus-box-multiple-outline" />
              어드민 계정 생성
            </v-card-item>
          </v-card>
        </v-col>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
          >
            <v-card-item>
              <span class="mdi mdi-format-list-bulleted" />
              어드민 계정 목록
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <h3 class="my-2 pt-5">
        축제 관리 기능
      </h3>
      <v-row>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
          >
            <v-card-item>
              <span class="mdi mdi-alert-outline" />
              모든 FestivalQueryInfo 재갱신
            </v-card-item>
          </v-card>
        </v-col>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
          >
            <v-card-item>
              <span class="mdi mdi-alert-outline" />
              특정 FestivalQueryInfo 재갱신
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <h3 class="my-2 pt-5">
        공연 관리 기능
      </h3>
      <v-row>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
          >
            <v-card-item>
              <span class="mdi mdi-alert-outline" />
              모든 StageQueryInfo 재갱신
            </v-card-item>
          </v-card>
        </v-col>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
          >
            <v-card-item>
              <span class="mdi mdi-alert-outline" />
              특정 StageQueryInfo 재갱신
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
