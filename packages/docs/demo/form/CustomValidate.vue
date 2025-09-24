<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LzMessage, type FormInstance } from "lz-element";

const formRef = ref<FormInstance>();
const form = reactive({
  name: "",
  password: "",
  passwordConfirm: "",
});

const rules: any = reactive({
  name: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  password: [{ required: true, trigger: "blur", message: "请输入密码" }],
  passwordConfirm: [
    {
      required: true,
      trigger: "blur",
      message: "请再次输入密码",
    },
    {
      validator: (_: typeof rules, value: string) => value === form.password,
      trigger: "blur",
      message: "两个密码必须相同",
    },
  ],
});

const onSubmit = async (instance?: FormInstance) => {
  const valid = await instance?.validate();
  if (!valid) return;
  LzMessage.success("submit!");
};

const onReset = () => {
  formRef.value?.resetFields();
};
</script>

<template>
  <lz-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-position="top"
    @submit.prevent="onSubmit(formRef)"
  >
    <lz-form-item label="Activity name" prop="name">
      <lz-input v-model="form.name" />
    </lz-form-item>
    <lz-form-item label="Password" prop="password">
      <lz-input v-model="form.password" type="password" />
    </lz-form-item>
    <lz-form-item label="Password Confirm" prop="passwordConfirm">
      <lz-input v-model="form.passwordConfirm" type="password" />
    </lz-form-item>
    <lz-form-item>
      <lz-button type="primary" native-type="submit">Create</lz-button>
      <lz-button @click="onReset">Reset</lz-button>
    </lz-form-item>
  </lz-form>
</template>
