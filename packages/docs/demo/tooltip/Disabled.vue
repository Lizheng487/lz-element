<script lang="ts" setup>
import { ref } from "vue";

const disabled = ref(false);
</script>

<template>
  <lz-tooltip
    :disabled="disabled"
    content="click to close tooltip function"
    placement="bottom"
  >
    <lz-button @click="disabled = !disabled"
      >click to {{ disabled ? "active" : "close" }} tooltip function</lz-button
    >
  </lz-tooltip>
</template>
