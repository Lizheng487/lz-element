<script setup lang="ts">
import type { NotificationProps, NotificationCompInstance } from './types'
import { ref, onMounted, computed } from 'vue'
import { delay, bind } from 'lodash-es';
import { typeIconMap, RenderVnode } from '@lz-element/utils';
import { useOffset } from '@lz-element/hooks'
import { getLastBottomOffset } from './methods';
import { addUnit } from '@lz-element/utils';
import LzIcon from '../Icon/Icon.vue';


defineOptions({
  name: 'LzNotification'
})
const props = withDefaults(defineProps<NotificationProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  position: 'top-right',
  transitionName: 'fade',
  showClose: true,
})
const visible = ref(false)
const notificationRef = ref<HTMLDivElement>()
const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')
const boxHeight = ref(0)
const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  offset: props.offset,
  boxHeight
})
const horizontalClass = computed(() => props.position.endsWith('right') ? "right" : "left")
const verticalProperty = computed(() => props.position.startsWith('top') ? "top" : "bottom")
const customStyle = computed(() => ({
  [verticalProperty.value]: addUnit(topOffset.value),
  zIndex: props.zIndex,
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
onMounted(() => {
  visible.value = true
  startTimer()
})

defineExpose<NotificationCompInstance>({
  close,
  bottomOffset
})
</script>

<template>
  <transition :name="`lz-notification-${transitionName}`"
    @enter="boxHeight = notificationRef!.getBoundingClientRect().height" @after-leave="!visible && onDestroy()">
    <div class="lz-notification" ref="notificationRef"
      :class="{ [`lz-notification--${type}`]: type, 'show-close': showClose, [horizontalClass]: true }"
      :style="customStyle" v-show="visible" role="alert" @mouseenter="clearTimer" @mouseleave="startTimer">
      <lz-icon v-if="iconName" class="lz-notification__icon" :icon="iconName"></lz-icon>
      <div class="lz-notification__text">
        <div class="lz-notification__title">{{ title }}</div>
        <div class="lz-notification__content">
          <slot>
            <render-vnode v-if="message" :vNode="message"></render-vnode>
          </slot>
        </div>
      </div>
      <div class="lz-notification__close" v-if="showClose">
        <lz-icon icon="xmark" @click.stop="close"></lz-icon>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>