<script setup>
import { LzMessage } from "lz-element";

function handleClose() {
  LzMessage.info("close callback");
}
</script>
<template>
  <div class="basic block">
    <lz-alert title="Unclosable alert" type="success" :closable="false" />
    <lz-alert title="Alert with callback" type="warning" @close="handleClose" />
  </div>
</template>
