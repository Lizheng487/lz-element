<script lang="ts" setup>
import { LzMessage } from "lz-element";

const open1 = () => {
  LzMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};
const open2 = () => {
  LzMessage.success("Congrats, this is a success message.");
};
</script>
<template>
  <div>
    <lz-button @click="open1">插件式调用</lz-button>
    <lz-button @click="open2">函数式调用</lz-button>
    <lz-button @click="$message.success('Congrats, this is a success message.')"
      >全局方法调用</lz-button
    >
  </div>
</template>
