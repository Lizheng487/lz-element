<script lang="ts" setup>
import { LzNotification } from "lz-element";

const open1 = () => {
  LzNotification({
    title: "Success",
    message: "This is a success message",
    type: "success",
  });
};

const open2 = () => {
  LzNotification({
    title: "Warning",
    message: "This is a warning message",
    type: "warning",
  });
};

const open3 = () => {
  LzNotification({
    title: "Info",
    message: "This is an info message",
    type: "info",
  });
};

const open4 = () => {
  LzNotification({
    title: "Error",
    message: "This is an error message",
    type: "danger",
  });
};
</script>

<template>
  <lz-button plain @click="open1"> Success </lz-button>
  <lz-button plain @click="open2"> Warning </lz-button>
  <lz-button plain @click="open3"> Info </lz-button>
  <lz-button plain @click="open4"> Error </lz-button>
</template>
