<script setup lang="ts">

import CreateForm from '@/components/form/CreateForm.vue';
import { useField, useForm } from 'vee-validate';
import { CreateAdminAccountRequest } from '@/api/spec/admin/CreateAdminAccountApiSpec.ts';
import Toast from '@/utils/Toast.ts';
import FestagoError from '@/api/FestagoError.ts';
import RootAdminService from '@/api/admin/RootAdminService.ts';
import TextField from '@/components/form/textfield/TextField.vue';
import PasswordField from '@/components/form/textfield/PasswordField.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { object } from 'zod';
import FormValidator from '@/utils/FormValidator.ts';

const { isSubmitting, handleSubmit, handleReset, setErrors } = useForm<CreateAdminAccountRequest>({
  validationSchema: toTypedSchema(
    object({
      username: FormValidator.AdminRegister.username,
      password: FormValidator.AdminRegister.password,
      confirmPassword: FormValidator.AdminRegister.password,
    }),
  ),
});

const usernameField = useField<string>('username');
const passwordField = useField<string>('password');
const confirmPasswordField = useField<string>('confirmPassword');

const onSubmit = handleSubmit(async request => {
  if (passwordField.value.value !== confirmPasswordField.value.value) {
    passwordField.setErrors('비밀번호와 확인 비밀번호가 맞지 않습니다.');
    confirmPasswordField.setErrors('비밀번호와 확인 비밀번호가 맞지 않습니다.');
    return;
  }
  try {
    await RootAdminService.createAdminAccount(request);
    handleReset();
    Toast.success('어드민 계정이 생성되었습니다.');
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

</script>

<template>
  <CreateForm
    :on-submit="onSubmit"
    :loading="isSubmitting"
    form-title="어드민 계정 생성"
  >
    <TextField
      label="계정"
      v-model="usernameField.value.value"
      :error-messages="usernameField.errorMessage.value"
      placeholder="계정"
    />
    <PasswordField
      label="비밀번호"
      v-model="passwordField.value.value"
      :error-messages="passwordField.errorMessage.value"
    />
    <PasswordField
      label="비밀번호 확인"
      v-model="confirmPasswordField.value.value"
      :error-messages="confirmPasswordField.errorMessage.value"
    />
  </CreateForm>
</template>
