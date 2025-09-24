<script setup lang="ts">
import { h } from "vue";
import { LzNotification } from "lz-element";

function openNotify1() {
  LzNotification({
    title: "Title",
    message: h("i", { style: "color:teal" }, "This is a remider"),
    position:'bottom-right'
  });
}

function openNotify2() {
  LzNotification({
    title: "Prompt",
    message: "This is a message that does not auto close",
    duration: 0,
    position:'top-left'
  });
}
</script>

<template>
  <lz-button @click="openNotify1" plain>Closes automatically</lz-button>
  <lz-button @click="openNotify2" plain>Won't closes automatically</lz-button>
</template>
