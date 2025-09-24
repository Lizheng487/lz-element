<script setup lang="ts">
import { LzMessageBox, LzMessage } from "lz-element";

function openConfirm() {
  LzMessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", { type: "warning" })
    .then((action) => {
      LzMessage.info(`action: ${action}`);
    })
    .catch((action) => {
      LzMessage.warning(`action: ${action}`);
    });
}
</script>

<template>
  <lz-button @click="openConfirm" plain> Click to open the Confirm</lz-button>
</template>
