<script setup lang="ts">
defineOptions({
  name: 'LzButton',
});
</script>
<template>
  <button class="lz-button">
    <slot></slot>
  </button>
</template>
<style scoped>
.lz-button {
  padding: 0.5em 1em;
  border-radius: 0.25em;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>