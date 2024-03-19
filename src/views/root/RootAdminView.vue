<script setup lang="ts">
</script>

<template>
  <v-container
    class="px-12 mt-2"
  >
    <h1 class="my-2">
      루트 어드민 관리 페이지
    </h1>
    <div>
      <h3 class="my-2 pt-5">
        디버깅 기능
      </h3>
      <v-row>
        <v-col :cols="3">
          <v-card
            class="py-2"
            variant="outlined"
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
