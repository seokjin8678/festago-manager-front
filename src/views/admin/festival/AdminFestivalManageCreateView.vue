<script setup lang="ts">
import CreateForm from '@/components/form/CreateForm.vue';
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import AdminSchoolService from '@/api/admin/AdminSchoolService.ts';
import { FetchOneSchoolResponse } from '@/api/spec/school/FetchOneSchoolApiSpec.ts';
import Toast from '@/utils/Toast.ts';
import { CreateFestivalRequest } from '@/api/spec/festival/CreateFestivalApiSpec.ts';
import AdminFestivalService from '@/api/admin/AdminFestivalService.ts';
import FestagoError from '@/api/FestagoError.ts';
import TextField from '@/components/form/textfield/TextField.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { number, object, string } from 'zod';
import ImageUploadDialog from '@/components/dialog/ImageUploadDialog.vue';

const { isSubmitting, handleSubmit, setErrors, handleReset } = useForm<CreateFestivalRequest>({
  validationSchema: toTypedSchema(
    object({
      schoolId: number({
        required_error: '학교는 필수입니다.'
      }),
      name: string({
        required_error: '축제 이름은 필수입니다.',
      })
      .min(5, '축제 이름은 5글자 이상이어야 합니다.'),
      startDate: string({
        required_error: '시작일은 필수입니다.',
      }),
      endDate: string({
        required_error: '종료일은 필수입니다.',
      }),
      posterImageUrl: string()
      .max(255, '포스터 이미지 URL은 255글자 미만이어야 합니다.')
      .startsWith('https://', '포스터 이미지 URL은 https://로 시작되어야 합니다.')
      .optional(),
    }),
  ),
});
const nameField = useField<string>('name');
const schoolIdField = useField<number>('schoolId');
const startDateField = useField<string>('startDate');
const endDateField = useField<string>('endDate');
const posterImageUrlField = useField<string>('posterImageUrl');

const schools = ref<FetchOneSchoolResponse[]>([]);
const fakeSchoolName = ref<string>('');
const fetchSchoolsLoading = ref(false);
const showSchoolSelectDialog = ref(false);
const schoolSearchKeyword = ref('');

const onSubmit = handleSubmit(async request => {
  try {
    await AdminFestivalService.createFestival(request);
    handleReset();
    Toast.success('축제가 생성되었습니다!');
  } catch (e) {
    if (e instanceof FestagoError) {
      if (e.isValidError()) {
        setErrors(e.result);
      } else {
        Toast.error(e.message);
      }
    } else throw e;
  }
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

const showImageUploadDialog = ref(false);
const uploadDialogTitle = ref('');
const uploadCallback = ref((_: string) => {
});

function uploadPosterImage() {
  showImageUploadDialog.value = true;
  uploadDialogTitle.value = '포스터 이미지 업로드';
  uploadCallback.value = uploadUri => {
    posterImageUrlField.value.value = uploadUri;
  };
}

</script>

<template>
  <ImageUploadDialog
    v-model="showImageUploadDialog"
    :title="uploadDialogTitle"
    @upload-callback="uploadCallback"
  />
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
          v-for="school in schools"
          :key="school.id"
        >
          <td>{{ school.name }}</td>
          <td>
            <v-btn
              @click="selectSchool(school)"
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
    :loading="isSubmitting"
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
    <TextField
      label="축제 이름"
      placeholder="축제 이름"
      v-model="nameField.value.value"
      :error-messages="nameField.errorMessage.value"
    />
    <TextField
      label="축제 시작일"
      type="date"
      v-model="startDateField.value.value"
      :error-messages="startDateField.errorMessage.value"
    />
    <TextField
      label="축제 종료일"
      type="date"
      v-model="endDateField.value.value"
      :error-messages="endDateField.errorMessage.value"
    />
    <TextField
      label="축제 포스터 이미지 URL"
      placeholder="https://image.com/festival-poseter.png"
      v-model="posterImageUrlField.value.value"
      :error-messages="posterImageUrlField.errorMessage.value"
      :readonly="true"
      @click="uploadPosterImage"
    />
  </CreateForm>
</template>
