<script setup lang="ts">
import { LzButtonGroup } from 'lz-element';
import { reactive } from 'vue';

let activeName = reactive({
  accordion: true,
  modelValue: ["a"],
});
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <LzButton type="primary" size="large" icon="search" plain>111111111</LzButton>
  <lz-button-group>
    <lz-button type="primary"><lz-icon icon="angle-left"></lz-icon>上一页</lz-button>
    <lz-button type="primary">下一页<lz-icon icon="angle-right"></lz-icon></lz-button>
  </lz-button-group>
  <lz-collapse v-bind="activeName">
    <lz-collapse-item name="a" title="Title a">
      <div>this is content a</div>
    </lz-collapse-item>
    <lz-collapse-item name="b" title="title b">
      <div>this is content b</div>
    </lz-collapse-item>
    <lz-collapse-item name="c" title="title c  disable" disabled>
      <div>this is content c</div>
    </lz-collapse-item>
  </lz-collapse>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
