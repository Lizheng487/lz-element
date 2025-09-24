<script lang="ts" setup>
import { h } from "vue";
import { LzMessage } from "lz-element";

const open = () => {
  LzMessage("This is a message.");
};

const openVn = () => {
  LzMessage({
    message: h("p", { style: "line-height: 1; font-size: 14px" }, [
      h("span", null, "Message can be "),
      h("i", { style: "color: teal" }, "VNode"),
    ]),
  });
};
</script>

<template>
  <lz-button :plain="true" @click="open">Show message</lz-button>
  <lz-button :plain="true" @click="openVn">VNode</lz-button>
</template>
