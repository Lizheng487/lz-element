<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import { computed, ref, watchEffect, watch, type Ref, onUnmounted } from 'vue';
import { bind, debounce, type DebouncedFunc, isNil } from 'lodash-es';
import { createPopper, type Instance } from '@popperjs/core';
import { useClickOutside } from '@lz-element/hooks';

defineOptions({
  name: 'LzTooltip'
})
const props = withDefaults(defineProps<TooltipProps>(), {
  trigger: 'hover',
  placement: 'bottom',
  transition: 'fade',
  showTimeout: "0",
  hideTimeout: "200"
})
const emit = defineEmits<TooltipEmits>()
const visible = ref(false)
const events: Ref<Record<string, EventListener>> = ref({})
const outerEvents: Ref<Record<string, EventListener>> = ref({})
const dropdownEvents: Ref<Record<string, EventListener>> = ref({})
const containerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 8]
      }
    }
  ],
  ...props.popperOptions,
}))
const openDelay = computed(() => {
  props.trigger === 'hover' ? props.showTimeout : 0
})
const closeDelay = computed(() => {
  props.trigger === 'hover' ? props.hideTimeout : 0
})
let openDebounce: DebouncedFunc<() => void> | void
let closeDebounce: DebouncedFunc<() => void> | void
function openFinal() {
  closeDebounce?.cancel()
  openDebounce?.()
}
function closeFinal() {
  openDebounce?.cancel()
  closeDebounce?.()
}
function togglePopper() {
  visible.value ? closeFinal() : openFinal()
}
function setVisible(value: boolean) {
  if (props.disabled) return
  visible.value = value
  emit('visible-change', value)
}
function attachEvents() {
  if (props.disabled || props.manual) return
  if (props.trigger === 'hover') {
    events.value['mouseenter'] = openFinal
    outerEvents.value['mouseleave'] = closeFinal
    dropdownEvents.value['mouseenter'] = openFinal
    return
  }
  if (props.trigger === 'click') {
    events.value['click'] = togglePopper
    return
  }
  if (props.trigger === 'contextmenu') {
    events.value['contextmenu'] = (e) => {
      e.preventDefault()
      openFinal()
    }
    return
  }
}
let popperInstance: null | Instance
function destoryPopperInstance() {
  if (isNil(popperInstance)) return
  popperInstance.destroy()
  popperInstance = null
}
function resetEvents() {
  events.value = {}
  outerEvents.value = {}
  dropdownEvents.value = {}
  attachEvents()
}
const show: TooltipInstance['show'] = openFinal
const hide: TooltipInstance['hide'] = function () {
  openDebounce?.cancel()
  setVisible(false)
}
watch(visible, (val) => {
  if (!val) return
  if (triggerNode.value && popperNode.value) {
    popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
  }
}, { flush: "post" })
watch(() => props.manual, (isManual) => {
  if (isManual) {
    resetEvents()
    return
  }
  attachEvents()
})
watch(() => props.trigger, (val, oldVal) => {
  if (oldVal === val) return
  openDebounce?.cancel()
  visible.value = false
  emit("visible-change", false)
  resetEvents()
})
watchEffect(() => {
  if (!props.manual) {
    attachEvents()
  }
  openDebounce = debounce(bind(setVisible, null, true), openDelay)
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay)
})
useClickOutside(containerNode,()=>{
  emit("click-outside")
  if (props.trigger === "hover"||props.manual) return
  visible.value && closeFinal()
})
onUnmounted(() => {
  destoryPopperInstance()
})
defineExpose<TooltipInstance>({
  show,
  hide
})
</script>
<template>
  <div class="lz-tooltip" ref="containerNode" v-on="outerEvents">
    <div class="lz-tooltip__trigger" ref="triggerNode" v-on="events" v-if="!virtualTriggering">
      <slot></slot>
    </div>
    <slot name="default"></slot>
    <transition :name="transition" @after-leave="destoryPopperInstance">
      <div class="lz-tooltip__popper" ref="popperNode" v-on="dropdownEvents" v-if="visible">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>
<style scoped></style>