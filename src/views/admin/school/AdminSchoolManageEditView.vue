<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import AdminSchoolService from '@/api/admin/AdminSchoolService.ts';
import { useRoute } from 'vue-router';
import Toast from '@/utils/Toast.ts';
import FestagoError from '@/api/FestagoError.ts';
import { router } from '@/router';
import RouterPath from '@/router/RouterPath.ts';
import { UpdateSchoolRequest } from '@/api/spec/school/UpdateSchoolApiSpec.ts';
import EditForm from '@/components/form/EditForm.vue';
import { Region } from '@/type/school/Region.ts';
import SelectField from '@/components/form/textfield/SelectField.vue';
import ReadonlyField from '@/components/form/textfield/ReadonlyField.vue';
import TextField from '@/components/form/textfield/TextField.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';

const route = useRoute();

onMounted(() => {
  schoolId.value = parseInt(route.params.id as string);
  AdminSchoolService.fetchOneSchool(schoolId.value).then(response => {
    resetForm({ values: response.data });
  }).catch(e => {
    if (e instanceof FestagoError) {
      router.push(RouterPath.Admin.AdminSchoolManageListView.path);
      Toast.error('해당 학교를 찾을 수 없습니다.');
    } else throw e;
  });
});

const { isSubmitting, meta, resetForm, setErrors, handleSubmit } = useForm<UpdateSchoolRequest>({
  validationSchema: toTypedSchema(
    object({
      name: string({
        required_error: '대학교 이름은 필수입니다.',
      })
      .min(5, '대학교의 이름은 5글자 이상이어야 합니다.')
      .regex(/((학교|캠퍼스)$)/, '대학교의 이름은 "학교" 또는 "캠퍼스"로 끝나야 합니다.'),
      domain: string({
        required_error: '도메인은 필수입니다.',
      })
      .min(5, '도메인은 5글자 이상이어야 합니다.')
      .regex(/^[^.].*\..+$/, '도메인의 형식은 school.ac.kr과 같아야 합니다.')
      .regex(/^[a-zA-Z.]+$/, '도메인은 영문으로만 구성되어야 합니다.'),
      logoUrl: string()
      .max(255, '로고 URL은 255글자 미만이어야 합니다.')
      .startsWith('https://', '로고 URL은 https://로 시작되어야 합니다.')
      .optional(),
      backgroundImageUrl: string()
      .max(255, '백그라운드 이미지 URL은 255글자 미만이어야 합니다.')
      .startsWith('https://', '백그라운드 이미지 URL은 https://로 시작되어야 합니다.')
      .optional(),
      region: string({
        required_error: '지역은 필수입니다.',
      }),
    }),
  ),
});

const onUpdateSubmit = handleSubmit(async request => {
  try {
    await AdminSchoolService.updateSchool(schoolId.value!, request);
    Toast.success('학교가 수정되었습니다.');
    resetForm({ values: request });
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

function onDeleteSubmit() {
  AdminSchoolService.deleteSchool(schoolId.value!).then(() => {
    Toast.success('학교가 삭제되었습니다.');
    router.push(RouterPath.Admin.AdminSchoolManageListView.path);
  }).catch(e => {
    if (e instanceof FestagoError) {
      Toast.error(e.message);
    } else throw e;
  });
}

const schoolId = ref<number>();
const nameField = useField<string>('name');
const domainField = useField<string>('domain');
const regionField = useField<string>('region');
const logoUrlField = useField<string>('logoUrl');
const backgroundImageUrlField = useField<string>('backgroundImageUrl');
</script>

<template>
  <EditForm
    form-title="학교 수정/삭제"
    :loading="isSubmitting"
    :on-update-submit="onUpdateSubmit"
    :on-delete-submit="onDeleteSubmit"
    :is-touched="meta.dirty"
  >
    <ReadonlyField label="ID" :value="schoolId" />
    <TextField
      label="대학교 이름"
      v-model="nameField.value.value"
      :error-messages="nameField.errorMessage.value"
      placeholder="XX대학교"
    />
    <TextField
      label="학교 도메인"
      v-model="domainField.value.value"
      :error-messages="domainField.errorMessage.value"
      placeholder="school.ac.kr"
    />
    <TextField
      label="로고 URL (선택)"
      v-model="logoUrlField.value.value"
      :error-messages="logoUrlField.errorMessage.value"
      placeholder="https://image.com/logo.png"
    />
    <TextField
      label="백그라운드 이미지 URL (선택)"
      v-model="backgroundImageUrlField.value.value"
      :error-messages="backgroundImageUrlField.errorMessage.value"
      placeholder="https://image.com/backgroundImage.png"
    />
    <SelectField
      label="지역"
      :items="Object.values(Region)"
      v-model="regionField.value.value"
      :error-messages="regionField.errorMessage.value"
    />
  </EditForm>
</template>
