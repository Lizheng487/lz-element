<script setup lang="ts">
import { computed, reactive, ref, watch, nextTick, type Ref } from 'vue';
import type { MessageBoxProps, MessageBoxAction } from './types';
import { useZIndex, useId } from '@lz-element/hooks';
import { typeIconMap } from '@lz-element/utils';
import { isFunction, isNil } from 'lodash-es';
import type { InputInstance } from '../Input/types';

import LzOverlay from '../Overlay/Overlay.vue';
import LzIcon from '../Icon/Icon.vue';
import LzButton from '../Button/Button.vue';
import LzInput from '../Input/Input.vue';

defineOptions({
  name: 'LzMessageBox',
  inheritAttrs: false
})

const props = withDefaults(defineProps<MessageBoxProps>(), {
  lockScroll: true,
  showClose: true,
  closeOnClickModal: true,
  confirmButtonType: "primary",
  roundButton: false,
  boxType: "",
  inputValue: "",
  inputPlaceholder: 'Please input...',
  confirmButtonText: "Ok",
  cancelButtonText: "Cancel",
  showConfirmButton: true,
})
const { doAction } = props
const { nextZIndex } = useZIndex()
const headerRef = ref<HTMLElement>()
const inputRef = ref<InputInstance>()
const inputId = useId()

const state = reactive({
  ...props,
  zIndex: nextZIndex(),
})
const hasMessage = computed(() => !!state.message)
const iconComponent = computed(() => state.icon || typeIconMap.get(state.type ?? ''))

watch(() => props.visible?.value, val => {
  if (val) state.zIndex = nextZIndex()
  if (props.boxType !== 'prompt') return
  if (!val) return
  nextTick(() => {
    inputRef.value && inputRef.value.focus()
  })
})
function handleWrapperClick() {
  props.closeOnClickModal && handleAction('close')
}
function handleInputEnter(e: KeyboardEvent) {
  if (state.inputValue === 'textarea') return
  e.preventDefault()
  return handleAction('confirm')
}
function handleAction(action: MessageBoxAction) {
  isFunction(props.beforeClose) ? props.beforeClose(action, state, () => doAction(action, state.inputValue)) : doAction(action, state.inputValue)
}
function handleClose() {
  handleAction('close')
}
</script>
<template>
  <transition name="fade-in-linear" @after-leave="destroy">
    <lz-overlay v-show="(visible as Ref).value" :z-index="state.zIndex" mask>
      <div role="dialog" class="lz-overlay-message-box" @click="handleWrapperClick">
        <div ref="rootRef" :class="['lz-message-box', { 'is-center': state.center }]" @click.stop>
          <div class="lz-message-box__header" v-if="!isNil(state.title)" ref="headerRef"
            :class="{ 'show-close': state.showClose }">
            <div class="lz-message-box__title">
              <lz-icon v-if="iconComponent && state.center" :class="{ [`lz-icon-${state.type}`]: state.type }"
                :icon="iconComponent"></lz-icon>
              {{ state.title }}
            </div>
            <button v-if="showClose" class="lz-message-box__header-btn" @click.stop="handleClose"><lz-icon
                icon="xmark"></lz-icon></button>
          </div>
          <div class="lz-message-box__content">
            <lz-icon :icon="iconComponent" v-if="iconComponent && !state.center && hasMessage"
              :class="{ [`lz-icon-${state.type}`]: state.type }"></lz-icon>
            <div v-if="hasMessage" class="lz-message-box__message">
              <slot>
                <component :is="state.showInput ? 'label' : 'p'" :for="state.showInput ? inputId : void 0">{{
                  state.message }}</component>
              </slot>
            </div>
          </div>
          <div v-show="state.showInput" class="lz-message-box__input">
            <lz-input ref="inputRef" v-model="state.inputValue" :placeholder="state.inputPlaceholder"
              :type="state.inputType" @keyup.enter="handleInputEnter"></lz-input>
          </div>
          <div class="lz-message-box__footer">
            <lz-button v-if="state.showCancelButton" class="lz-message-box__footer-btn lz-message-box__cancel-btn"
              @click="handleAction('cancel')" :loading="state.cancelButtonLoading" :type="state.cancelButtonType"
              :round="state.roundButton" @keydown.prevent.enter="handleAction('cancel')">{{ state.cancelButtonText
              }}</lz-button>
            <lz-button v-if="state.showConfirmButton" class="lz-message-box__footer-btn lz-message-box__confirm-btn"
              @click="handleAction('confirm')" :loading="state.confirmButtonLoading"
              :type="state.confirmButtonType ?? 'primary'" :round="state.roundButton"
              @keydown.prevent.enter="handleAction('confirm')">{{ state.confirmButtonText }}</lz-button>
          </div>
        </div>
      </div>
    </lz-overlay>
  </transition>
</template>

<style scoped>
@import "./style.css";
</style>