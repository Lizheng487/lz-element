<script setup>
import { LzMessage } from "lz-element";
function handleBtnClick() {
  LzMessage.info("btn click");
}
</script>

<template>
  <p>
    <lz-button @click="handleBtnClick"> with throttle</lz-button>
    <lz-button :use-throttle="false" @click="handleBtnClick"
      >without throttle</lz-button
    >
  </p>
</template>
