<script setup lang="ts">
import type { CollapseItemProps } from './types';
import { inject, computed } from 'vue';
import { COLLAPSE_CTX_KEY } from './contants';
import LzIcon from '../Icon/Icon.vue';
import transitionEvents from './transitionEvents';
defineOptions({
  name: 'LzCollapseItem',
});
const props = defineProps<CollapseItemProps>();
const ctx = inject(COLLAPSE_CTX_KEY, void 0);
const isActive = computed(() => {
  return ctx?.activeNames.value?.includes(props.name);
});
function handleClick() {
  if (props.disabled) {
    return;
  }
  ctx?.handleItemClick(props.name);
}
</script>
<template>
  <div class="lz-collapse-item" :class="{
    'is-disabled': disabled,
  }">
    <div class="lz-collapse-item__header" :id="`item-header-${name}`" :class="{
      'is-disabled': disabled,
      'is-active': isActive,
    }" @click="handleClick">
      <span class="lz-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </span>
      <lz-icon icon="angle-right" class="header-angle"></lz-icon>
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="lz-collapse-item__wapper" v-show="isActive">
        <div class="lz-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped>
@import "./style.css";
</style>