<script setup lang="ts">
import type { ButtonGroupProps } from './types';
import { provide, reactive, toRef } from 'vue';
import { BUTTON_GROUP_CTX_KEY } from './contants';
defineOptions({
  name: 'LzButtonGroup',
});
const props = defineProps<ButtonGroupProps>();

provide(BUTTON_GROUP_CTX_KEY, reactive({
  type: toRef(props, 'type'),
  size: toRef(props, 'size'),
  disabled: toRef(props, 'disabled'),
}));
</script>

<template>
  <div class="lz-button-group">
    <slot></slot>
  </div>
</template>
<style scoped>
@import "./style.css";
</style>