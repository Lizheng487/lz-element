<script lang="ts" setup>
import { LzMessage } from "lz-element";

const open1 = () => {
  LzMessage("This is a message.");
};
const open2 = () => {
  LzMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open3 = () => {
  LzMessage({
    message: "Warning, this is a warning message.",
    type: "warning",
  });
};
const open4 = () => {
  LzMessage.error("Oops, this is a error message.");
};
</script>

<template>
  <lz-button :plain="true" @click="open2">Success</lz-button>
  <lz-button :plain="true" @click="open3">Warning</lz-button>
  <lz-button :plain="true" @click="open1">Message</lz-button>
  <lz-button :plain="true" @click="open4">Error</lz-button>
</template>
