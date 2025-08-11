<script setup>
function handleBtnClick() {
  console.log("btn click");
}
</script>

<template>
  <p>
    <lz-button @click="handleBtnClick"> with throttle</lz-button>
    <lz-button :use-throttle="false" @click="handleBtnClick"
      >without throttle</lz-button
    >
  </p>
</template>
