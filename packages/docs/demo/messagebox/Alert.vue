<script setup lang="ts">
import { LzMessageBox, LzMessage } from "lz-element";

function openAlert() {
  LzMessageBox.alert("This is a message", "Title")
    .then((action) => {
      LzMessage.info(`action: ${action}`);
    })
    .catch((action) => {
      LzMessage.warning(`action: ${action}`);
    });
}
</script>

<template>
  <lz-button @click="openAlert" plain> Click to open the Alert</lz-button>
</template>
