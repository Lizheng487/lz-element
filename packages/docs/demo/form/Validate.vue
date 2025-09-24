<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LzMessage, type FormInstance } from "lz-element";

const formRef = ref<FormInstance>();
const form = reactive({
  name: "",
  region: "",
  delivery: false,
  desc: "",
});

const options = ref([
  { value: "beijing", label: "Zone One" },
  { value: "shanghai", label: "Zone Two" },
]);

const rules = reactive({
  name: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
  desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
});

const onSubmit = () => {
  formRef.value?.validate().then((valid) => {
    if (valid) {
      LzMessage.success("submit!");
    }
  });
};

const onReset = () => {
  formRef.value?.resetFields();
};
</script>

<template>
  <lz-form ref="formRef" :model="form" :rules="rules">
    <lz-form-item label="Activity name" prop="name">
      <lz-input v-model="form.name" />
    </lz-form-item>
    <lz-form-item label="Activity zone" prop="region">
      <lz-select
        v-model="form.region"
        placeholder="please select your zone"
        :options="options"
      />
    </lz-form-item>
    <lz-form-item label="Instant delivery" prop="delivery">
      <lz-switch v-model="form.delivery" />
    </lz-form-item>
    <lz-form-item label="Activity form" prop="desc">
      <lz-input v-model="form.desc" type="textarea" />
    </lz-form-item>
    <lz-form-item>
      <lz-button type="primary" @click="onSubmit">Create</lz-button>
      <lz-button @click="onReset">Reset</lz-button>
    </lz-form-item>
  </lz-form>
</template>
