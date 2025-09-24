<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LzMessage, type FormProps } from "lz-element";

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
const labelPosition = ref<FormProps["labelPosition"]>("right");

const onSubmit = () => {
  LzMessage.success("submit");
};
</script>

<template>
  <lz-button-group size="small">
    <lz-button
      @click="labelPosition = 'left'"
      :type="labelPosition === 'left' ? 'primary' : 'info'"
      >Left</lz-button
    >
    <lz-button
      @click="labelPosition = 'right'"
      :type="labelPosition === 'right' ? 'primary' : 'info'"
      >Right</lz-button
    >
    <lz-button
      @click="labelPosition = 'top'"
      :type="labelPosition === 'top' ? 'primary' : 'info'"
      >Top</lz-button
    >
  </lz-button-group>
  <div style="margin: 20px"></div>
  <lz-form :model="form" :label-position="labelPosition">
    <lz-form-item label="Activity name">
      <lz-input v-model="form.name" />
    </lz-form-item>
    <lz-form-item label="Activity zone">
      <lz-select
        v-model="form.region"
        placeholder="please select your zone"
        :options="options"
      />
    </lz-form-item>
    <lz-form-item label="Instant delivery">
      <lz-switch v-model="form.delivery" />
    </lz-form-item>
    <lz-form-item label="Activity form">
      <lz-input v-model="form.desc" type="textarea" />
    </lz-form-item>
    <lz-form-item>
      <lz-button type="primary" @click="onSubmit">Create</lz-button>
      <lz-button>Cancel</lz-button>
    </lz-form-item>
  </lz-form>
</template>
