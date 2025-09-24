<script setup lang="ts">
import { LzMessageBox, LzMessage } from "lz-element";

function openConfirm() {
  LzMessageBox.prompt("Place input your name", "Tip", { type: "info" })
    .then(({ value }) => {
      LzMessage.info(`your name is: ${value}`);
    })
    .catch((action) => {
      LzMessage.warning(`action: ${action}`);
    });
}
</script>

<template>
  <lz-button @click="openConfirm" plain> Click to open the Confirm</lz-button>
</template>
