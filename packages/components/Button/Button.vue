<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types';
import { throttle } from 'lodash-es';
import { LzIcon } from '../Icon';

defineOptions({
  name: 'LzButton',
});
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  type: 'default',
  size: 'default',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500,
})
const slots = defineSlots();
const _ref = ref<HTMLButtonElement>()
const emits = defineEmits<ButtonEmits>();
const iconStyle = computed(() => ({
  marginRight: slots.default ? '8px' : '0'
}));
const handleBtnClick = (e: MouseEvent) => {
  emits('click', e);
};
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration);

defineExpose<ButtonInstance>({
  ref: _ref,
});
</script>
<template>
  <component :is="props.tag" :autofocus="autofocus" ref="_ref" class="lz-button"
    :type="tag === 'button' ? props.nativeType : void 0" :disabled="props.disabled || props.loading ? true : void 0"
    :class="{
      'is-circle': props.circle,
      'is-plain': props.plain,
      'is-round': props.round,
      'is-loading': props.loading,
      'is-disabled': props.disabled,
      [`lz-button--${props.type}`]: props.type,
      [`lz-button--${props.size}`]: props.size,
    }" @click="(e: MouseEvent) => props.useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)">
    <template v-if="props.loading">
      <slot name="loading">
        <lz-icon class="loading-icon" :icon="props.loadingIcon ?? 'spinner'" :style="iconStyle" size="1x"
          spin></lz-icon>
      </slot>
    </template>
    <lz-icon v-if="icon && !loading" :icon="icon" size="1x" :style="iconStyle"></lz-icon>
    <slot></slot>
  </component>
</template>

<style scoped>
@import './style.css';
</style>