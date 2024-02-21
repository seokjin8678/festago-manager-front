<script setup lang="ts">
import CreateForm from '@/components/form/CreateForm.vue';
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import AdminSchoolService from '@/api/admin/AdminSchoolService.ts';
import { FetchOneSchoolResponse } from '@/api/spec/school/FetchOneSchoolApiSpec.ts';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import { CreateFestivalRequest } from '@/api/spec/festival/CreateFestivalApiSpec.ts';
import AdminFestivalService from '@/api/admin/AdminFestivalService.ts';
import FestagoError from '@/api/FestagoError.ts';

const snackbarStore = useSnackbarStore();
const { handleSubmit, handleReset } = useForm<CreateFestivalRequest>({
  validationSchema: {
    schoolId(value: string) {
      if (!value) return '학교는 필수입니다.';
      return true;
    },
    name(value: string) {
      if (!value) return '축제 이름은 필수입니다.';
      if (value.length < 5) return '축제 이름은 5글자 이상이어야 합니다.';
      return true;
    },
    startDate(value: string) {
      if (!value) return '시작일은 필수입니다.';
      return true;
    },
    endDate(value: string) {
      if (!value) return '시작일은 필수입니다.';
      return true;
    },
    posterImageUrl(value: string) {
      if (!value) return '포스터 이미지 URL은 필수입니다.';
      if (value.length >= 255) return '포스터 이미지 URL은 255글자 미만이어야 합니다.'
      if (!value.startsWith("https://")) return '포스터 이미지 URL은 https://로 시작되어야 합니다.'
      if (!/\.(png|jpg)$/.test(value)) return '포스터 이미지 URL은 png,jpg와 같은 이미지 파일으로 끝나야 합니다.'
      return true;
    },
  },
});
const nameField = useField('name');
const schoolIdField = useField('schoolId');
const startDateField = useField('startDate');
const endDateField = useField('endDate');
const posterImageUrlField = useField('posterImageUrl');

const schools = ref<FetchOneSchoolResponse[]>([]);
const fakeSchoolName = ref<string>('');
const loading = ref(false);
const fetchSchoolsLoading = ref(false);
const showSchoolSelectDialog = ref(false);
const schoolSearchKeyword = ref('');
const onSubmit = handleSubmit(request => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  AdminFestivalService.createFestival(request).then(()=>{
    handleReset();
    loading.value = false;
    snackbarStore.showSuccess('축제가 생성되었습니다!');
  }).catch(e => {
    if (e instanceof FestagoError) {
      snackbarStore.showError(e.message);
    } else throw e;
  });
});

function fetchSchools() {
  fetchSchoolsLoading.value = true;
  setTimeout(() => (fetchSchoolsLoading.value = false), 500);
  AdminSchoolService.fetchSchools({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
  }, {
    searchKeyword: schoolSearchKeyword.value,
    searchFilter: 'name',
  }).then(response => {
    schools.value = response.data.content;
  });
}

function selectSchool(school: FetchOneSchoolResponse) {
  fakeSchoolName.value = school.name;
  schoolIdField.setValue(school.id);
  showSchoolSelectDialog.value = false;
}

</script>

<template>
  <v-dialog
    v-model="showSchoolSelectDialog"
    max-width="500"
  >
    <v-card class="pa-5">
      <v-card-title class="text-h5 text-center">
        학교 선택
      </v-card-title>

      <v-row :no-gutters="true" align="center">
        <v-col :cols="10">
          <v-text-field
            class="pa-2 ma-2"
            v-model="schoolSearchKeyword"
            label="학교 이름"
            prepend-inner-icon="mdi-magnify"
            :single-line="true"
            variant="outlined"
            :hide-details="true"
            maxLength="50"
          />
        </v-col>
        <v-col :cols="2">
          <v-btn
            :loading="fetchSchoolsLoading"
            :disabled="!(!!(schoolSearchKeyword))"
            class="py-7 text-h6"
            color="blue"
            variant="flat"
            :block="true"
            text="검색"
            @click="fetchSchools"
          />
        </v-col>
      </v-row>

      <v-table class="text-center">
        <thead>
        <tr>
          <th id="name" class="text-center">
            이름
          </th>
          <th id="selectBtn" class="text-center" />
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="item in schools"
          :key="item.id"
        >
          <td>{{ item.name }}</td>
          <td>
            <v-btn
              @click="selectSchool(item)"
              text="선택"
            />
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-dialog>
  <CreateForm
    :on-submit="onSubmit"
    :loading="loading"
    form-title="축제 추가"
  >
    <v-text-field
      @click="showSchoolSelectDialog = true"
      :readonly="true"
      :error-messages="schoolIdField.errorMessage.value"
      v-model="fakeSchoolName"
      variant="outlined"
      label="학교를 선택해주세요."
    />
    <input
      v-model="schoolIdField.value.value"
      type="text"
      hidden="hidden"
    >
    <v-text-field
      class="mb-3"
      v-model="nameField.value.value"
      :error-messages="nameField.errorMessage.value"
      placeholder="축제 이름"
      variant="outlined"
      label="축제 이름"
    />
    <v-text-field
      class="mb-3"
      type="date"
      v-model="startDateField.value.value"
      :error-messages="startDateField.errorMessage.value"
      variant="outlined"
      label="축제 시작일"
    />
    <v-text-field
      class="mb-3"
      type="date"
      v-model="endDateField.value.value"
      :error-messages="endDateField.errorMessage.value"
      variant="outlined"
      label="축제 종료일"
    />
    <v-text-field
      class="mb-3"
      v-model="posterImageUrlField.value.value"
      :error-messages="posterImageUrlField.errorMessage.value"
      placeholder="https://image.com/festival-poseter.png"
      variant="outlined"
      label="축제 포스터 이미지 URL"
    />
  </CreateForm>
</template>
