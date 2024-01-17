<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import AdminSchoolService from '@/api/admin/AdminSchoolService.ts';
import { useRoute } from 'vue-router';
import { useSnackbarStore } from '@/stores/useSnackbarStore.ts';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import RouterPath from '@/router/RouterPath.ts';
import { UpdateSchoolRequest } from '@/api/spec/school/UpdateSchoolApiSpec.ts';

const route = useRoute();
const snackbarStore = useSnackbarStore();

onMounted(() => {
  AdminSchoolService.fetchOneSchool(parseInt(route.params.id as string)).then(response => {
    const { id, name, domain } = response.data;
    schoolId.value = id;
    nameField.resetField({
      value: name,
    });
    domainField.resetField({
      value: domain,
    });
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminSchoolManageListPage.path);
      snackbarStore.showError('해당 학교를 찾을 수 없습니다.');
    } else throw e;
  });
});

const { handleSubmit, isFieldDirty } = useForm<UpdateSchoolRequest>({
  validationSchema: {
    name(value: string) {
      if (!value) return '대학교 이름은 필수입니다.';
      return true;
    },
    domain(value: string) {
      if (!value) return '도메인은 필수입니다.';
      return true;
    },
  },
});

const onUpdateSubmit = handleSubmit(request => {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  if (!isFieldDirty('name') && !isFieldDirty('domain')) {
    snackbarStore.showError('아무것도 수정되지 않았습니다.');
    return;
  }
  AdminSchoolService.updateSchool(schoolId.value!, request).then(() => {
    loading.value = false;
    snackbarStore.showSuccess('학교가 수정되었습니다.');
    nameField.resetField({
      value: nameField.value.value,
    });
    domainField.resetField({
      value: domainField.value.value,
    });
  }).catch(e => {
    if (e instanceof FestagoError) {
      snackbarStore.showError(e.message);
    } else throw e;
  });
});

function deleteSchool() {
  AdminSchoolService.deleteSchool(schoolId.value!).then(() => {
    snackbarStore.showSuccess('학교가 삭제되었습니다.');
    router.push(RouterPath.Admin.AdminSchoolManageListPage.path);
  }).catch(e => {
    if (e instanceof FestagoError) {
      snackbarStore.showError(e.message);
    } else throw e;
  });
}

const schoolId = ref<number>();
const nameField = useField<string>('name');
const domainField = useField<string>('domain');
const invalidForm = ref(false);
const loading = ref(false);
const showDialog = ref(false);
</script>

<template>
  <v-dialog
    v-model="showDialog"
    max-width="500"
  >
    <v-card class="pa-5">
      <v-card-title class="text-h5 text-center">
        정말로 삭제할까요?
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text="취소"
          color="blue-darken-1"
          variant="text"
          @click="showDialog = false"
        />
        <v-btn
          text="삭제"
          color="red-darken-1"
          variant="text"
          @click="deleteSchool"
        />
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-card
    class="mx-auto pa-3 pa-md-15 py-8 mt-16 w-75"
    max-width="800"
    min-width="350"
    elevation="4"
  >
    <v-card-title class="mb-3 text-h4 text-center">
      학교 수정/삭제
    </v-card-title>
    <v-form
      v-model="invalidForm"
      @submit.prevent="onUpdateSubmit"
    >
      <v-text-field
        class="mb-3"
        variant="outlined"
        label="ID"
        :model-value="schoolId"
        :readonly="true"
      />
      <v-text-field
        class="mb-3"
        v-model="nameField.value.value"
        :error-messages="nameField.errorMessage.value"
        placeholder="XX대학교"
        variant="outlined"
        label="대학교 이름"
      />
      <v-text-field
        class="mb-3"
        v-model="domainField.value.value"
        :error-messages="domainField.errorMessage.value"
        placeholder="school.ac.kr"
        variant="outlined"
        label="학교 도메인"
      />
      <v-btn
        :disabled="!invalidForm"
        :loading="loading"
        class="text-h6"
        type="submit"
        text="수정"
        color="blue"
        :block="true"
      />
      <v-btn
        :disabled="loading"
        class="text-h6 mt-4"
        text="삭제"
        color="red"
        :block="true"
        @click="showDialog = true"
      />
      <v-btn
        :disabled="loading"
        class="text-h6 mt-4"
        text="취소"
        color="grey"
        :block="true"
        @click="$router.go(-1)"
      />
    </v-form>
  </v-card>
</template>
