<script lang="ts" setup>
import { LzMessage } from "lz-element";

const openCenter = () => {
  LzMessage({
    showClose: true,
    message: "Centered text",
    center: true
  });
};
</script>

<template>
  <lz-button plain @click="openCenter">Centered text</lz-button>
</template>
