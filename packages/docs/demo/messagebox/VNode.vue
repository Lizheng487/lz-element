<script setup lang="ts">
import { h, ref } from "vue";
import { LzMessageBox, LzSwitch, type SwitchValueType } from "lz-element";

function open1() {
  LzMessageBox({
    title: "Message",
    message: h("p", null, [
      h("span", null, "Message can be "),
      h("i", { style: "color: teal" }, "VNode"),
    ]),
  });
}

function open2() {
  const checked = ref<SwitchValueType>(false);
  LzMessageBox({
    title: "Message",
    message: () =>
      h(LzSwitch, {
        modelValue: checked.value,
        "onUpdate:modelValue": (val: SwitchValueType) => {
          checked.value = val;
        },
      }),
  });
}
</script>

<template>
  <lz-button @click="open1" plain>Common VNode</lz-button>
  <lz-button @click="open2" plain>Dynamic props</lz-button>
</template>
