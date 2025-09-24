<script setup lang="ts">
import { LzMessage, LzMessageBox } from "lz-element";

function openMsgBox() {
  LzMessageBox.confirm(
    "proxy will permanently delete the file. Continue?",
    "Warning",
    {
      type: "warning",
      center: true,
      // 这里展示一下 不用 Promise 写法的时候
      callback(action) {
        if (action === "confirm") {
          LzMessage.info(action);
        } else {
          LzMessage.warning(action as string);
        }
      },
    }
  );
}
</script>

<template>
  <lz-button @click="openMsgBox" plain>Click to open Message Box</lz-button>
</template>
