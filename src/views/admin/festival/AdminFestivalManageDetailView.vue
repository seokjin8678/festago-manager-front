<script setup lang="ts">
import RouterPath from '@/router/RouterPath.ts';
</script>

<template>
  <v-container
    class="pa-10 ma-10 pt-0"
  >
    <h1 class="my-2">
      축제 상세 페이지
    </h1>

    <div>
      <h3 class="my-2 pt-5">
        축제 정보
      </h3>
      <v-row>
        <v-col :cols="6">
          <v-card>
            <v-card-item
              class="px-8 py-2"
            >
              <div class="py-2">
                <v-text-field
                  variant="outlined"
                  label="ID"
                  :readonly="true"
                />
                <v-text-field
                  variant="outlined"
                  label="이름"
                  :readonly="true"
                />
                <v-text-field
                  variant="outlined"
                  label="학교 이름"
                  :readonly="true"
                />
                <v-text-field
                  variant="outlined"
                  label="축제 시작일"
                  :readonly="true"
                />
                <v-text-field
                  variant="outlined"
                  label="축제 종료일"
                  :readonly="true"
                />
                <v-text-field
                  variant="outlined"
                  label="축제 포스터 URL"
                  :readonly="true"
                />
                <v-text-field
                  variant="outlined"
                  label="생성일자"
                  :readonly="true"
                />
                <v-text-field
                  variant="outlined"
                  label="수정일자"
                  :readonly="true"
                />
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div>
      <h3 class="my-2 pt-5">
        축제 관리
      </h3>
      <v-row>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
            @click="$router.push(RouterPath.Admin.AdminFestivalManageEditPage)"
          >
            <v-card-item>
              <span class="mdi mdi-pencil-outline" />
              축제 수정/삭제
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div>
      <h3 class="my-2 pt-5">
        공연 관리
      </h3>
      <v-row>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
          >
            <v-card-item>
              <span class="mdi mdi-plus-box-multiple-outline" />
              공연 추가
            </v-card-item>
          </v-card>
        </v-col>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
          >
            <v-card-item>
              <span class="mdi mdi-pencil-outline" />
              공연 수정/삭제
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
