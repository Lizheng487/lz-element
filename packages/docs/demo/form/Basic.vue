<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LzMessage } from "lz-element";

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

const onSubmit = () => {
  LzMessage.success("submit!");
};
</script>

<template>
  <lz-form :model="form">
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
