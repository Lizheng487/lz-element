<script setup lang="ts">
import type { MessageProps, MessageCompInstance } from './types'
import { ref, onMounted, watch, computed } from 'vue'
import { delay, bind } from 'lodash-es';
import { typeIconMap, RenderVnode } from '@lz-element/utils';
import { useOffset, useEventListener } from '@lz-element/hooks'
import { getLastBottomOffset } from './methods';
import { addUnit } from '@lz-element/utils';
import LzIcon from '../Icon/Icon.vue';
defineOptions({
  name: 'LzMessage'
})

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  // showClose: false,
  // center: false,
  offset: 10,
  // zIndex: 2000,
  transitionName: 'fade-up'
})
const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')
const boxHeight = ref(0)
const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  offset: props.offset,
  boxHeight
})
const customStyle = computed(() => ({
  top: addUnit(topOffset.value),
  zIndex: props.zIndex,
  // top: topOffset.value + "px",
}))
let timer: number
function startTimer() {
  if (props.duration === 0) return
  timer = delay(close, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}
function close() {
  visible.value = false
}
watch(visible, (val) => {
  if (!val) boxHeight.value = -props.offset
})

useEventListener(document, 'keydown', (e: Event) => {
  const { code } = e as KeyboardEvent
  if (code === 'Escape') close()
})
onMounted(() => {
  visible.value = true
  startTimer()
})
defineExpose<MessageCompInstance>({
  close,
  bottomOffset
})
</script>
<template>
  <transition :name="transitionName" @enter="boxHeight = messageRef!.getBoundingClientRect().height"
    @after-leave="!visible && onDestroy()">
    <div ref="messageRef" class="lz-message"
      :class="{ [`lz-message--${type}`]: type, 'is-close': showClose, 'text-center': center }" :style="customStyle"
      v-show="visible" role="alert" @mouseenter="clearTimer" @mouseleave="startTimer">
      <lz-icon class="lz-message__icon" :icon="iconName"></lz-icon>
      <div class="lz-message__content">
        <slot>
          <render-vnode v-if="message" :vNode="message">
          </render-vnode>
        </slot>
      </div>
      <div class="lz-message__close" v-if="showClose">
        <lz-icon icon="xmark" @click.stop="close"></lz-icon>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>