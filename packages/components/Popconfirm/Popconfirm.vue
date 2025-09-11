<script setup lang="ts">
import LzTooltip from '../Tooltip/Tooltip.vue';
import LzIcon from '../Icon/Icon.vue';
import LzButton from '../Button/Button.vue';
import { ref, computed } from 'vue';
import type { TooltipInstance } from '../Tooltip';
import type { PopconfirmProps, PopconfirmEmits } from './type';
import { addUnit } from '@lz-element/utils';
defineOptions({
  name: 'LzPopconfirm'
})
const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: ' 确认删除吗？',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  confirmButtonType: 'primary',
  cancelButtonType: 'info',
  icon: 'check-circle',
  iconColor: 'green',
  hideIcon: false,
  hideAfter: 500,
  width: 200
});
const emits = defineEmits<PopconfirmEmits>();
const tooltipRef = ref<TooltipInstance>();
const style = computed(() => ({ width: addUnit(props.width) }));
function hidePopper() {
  tooltipRef.value?.hide();
}
function confirm(e: MouseEvent) {
  emits("confirm", e);
  hidePopper();
}
function cancel(e: MouseEvent) {
  emits("cancel", e);
  hidePopper();
}
</script>

<template>
  <lz-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter" :style="style">
    <template #content>
      <div class="lz-popconfirm">
        <div class="lz-popconfirm__main">
          <lz-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor"></lz-icon>
          {{ title }}
        </div>
        <div class="lz-popconfirm__action">
          <lz-button size="small" :type="cancelButtonType" @click="cancel">{{ cancelButtonText }}</lz-button>
          <lz-button size="small" :type="confirmButtonType" @click="confirm">{{ confirmButtonText }}</lz-button>
        </div>
      </div>
    </template>
    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>
    <template v-if="$slots.reference" #default>
      <slot name="reference"></slot>
    </template>
  </lz-tooltip>
</template>
<style scoped>
@import './style.css'
</style>