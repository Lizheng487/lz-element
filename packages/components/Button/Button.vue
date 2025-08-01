<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types';
import { throttle } from 'lodash-es';
import { LzIcon } from '../Icon';
import { BUTTON_GROUP_CTX_KEY } from './contants';
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
const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0)
const _ref = ref<HTMLButtonElement>()
const emits = defineEmits<ButtonEmits>();
const iconStyle = computed(() => ({
  marginRight: slots.default ? '8px' : '0'
}));
const handleBtnClick = (e: MouseEvent) => {
  emits('click', e);
};
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration, { trailing: false });


// 明确指定返回类型为 string
const size = computed<string>(() => {
  return ctx?.size ?? props?.size ?? ""
})
// 明确指定返回类型为 string
const type = computed<string>(() => {
  return ctx?.type ?? props?.type ?? ""
})
// 明确指定返回类型为 boolean
const disabled = computed<boolean>(() => {
  return ctx?.disabled || props?.disabled || false
})
defineExpose<ButtonInstance>({
  ref: _ref,
});
</script>
<template>
  <component ref="_ref" class="lz-button" :is="tag" :autofocus="autofocus"
    :type="tag === 'button' ? props.nativeType : void 0" :disabled="props.disabled || props.loading ? true : void 0"
    :class="{
      'is-circle': circle,
      'is-plain': plain,
      'is-round': round,
      'is-loading': loading,
      'is-disabled': disabled,
      [`lz-button--${type}`]: type,
      [`lz-button--${size}`]: size,
    }" @click="(e: MouseEvent) => props.useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)">
    <template v-if="loading">
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