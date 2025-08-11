<script setup lang="ts">
import type { AlertEmits, AlertProps, AlertInstance } from './types';
import { computed, ref } from 'vue';
import { typeIconMap } from '@lz-element/utils';
import LzIcon from '../Icon/Icon.vue';

defineOptions({
  name: "LzAlert",
});

const props = withDefaults(defineProps<AlertProps>(), {
  type: "info",
  closable: true,
  effect: "light",
});

const emit = defineEmits<AlertEmits>();
const slot = defineSlots();
const visible = ref(true);
const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info');
const withDescription = computed(() => props.description || slot.default);
function close() {
  visible.value = false;
  emit("close");
}
function open() {
  visible.value = true;
}
defineExpose<AlertInstance>({
  open,
  close,
});

</script>
<template>
  <transition name="lz-alert-fade">
    <div v-show="visible" class="lz-alert" :class="{
      [`lz-alert__${type}`]: type,
      [`lz-alert__${effect}`]: effect,
      'text-center': center,
    }">
      <lz-icon v-if="showIcon" :icon="iconName" :class="{ 'big-icon': withDescription }"
        class="lz-alert__icon"></lz-icon>
      <div class="lz-alert__content">
        <span class="lz-alert__title" :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="lz-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="lz-alert__close" v-if="closable">
          <lz-icon icon="xmark" @click.stop="close"></lz-icon>
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped>
@import './style.css';
</style>