<script setup lang="ts">
import { isString } from 'lodash-es';
import type { LoadingOptions } from './types';
import { computed, type Ref } from 'vue';
import LzIcon from '../Icon/Icon.vue';


defineOptions({
  name: 'LzLoading',
  inheritAttrs: false
})

const props = defineProps<LoadingOptions>()
const iconName = computed(() => {
  if (isString(props.spinner)) {
    return props.spinner;
  }
  return 'spinner'//circle-notch

})
</script>
<template>
  <Transition name="fade-in-linear" @after-leave="onAfterLeave">
    <div class="lz-loading lz-loading__mask" v-show="(props.visible as Ref).value"
      :class="{ 'is-fullscreen': fullscreen }">
      <div class="lz-loading__spinner">
        <LzIcon v-if="props.spinner !== false" :icon="iconName" spin></LzIcon>
        <p class="lz-loading__text" v-if="text">{{ text }}</p>
      </div>
    </div>
  </Transition>
</template>

<style>
@import './style.css';

.lz-loading {
  --lz-loading-bg-color: v-bind(background) !important;
  --lz-loading-z-index: v-bind(zIndex) !important;
}
</style>