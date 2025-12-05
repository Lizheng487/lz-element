<script setup lang="ts">
import { computed, nextTick, provide, reactive, ref, watch, type VNode } from 'vue';
import { POPPER_OPTIONS, SELECT_CTX_KEY } from './constants';
import type { SelectProps, SelectInstance, SelectContext, SelectEmits, SelectStates, SelectOptionProps } from './types'
import { useId, useFocusController, useClickOutside } from '@lz-element/hooks';
import type { TooltipInstance } from '../Tooltip';
import type { InputInstance } from '../Input';
import { each, eq, filter, find, get, size, noop, isFunction } from 'lodash-es';
import LzOption from './Option.vue'
import LzTooltip from '../Tooltip/Tooltip.vue';
import LzInput from '../Input/Input.vue';
import LzIcon from '../Icon/Icon.vue';

defineOptions({
  name: 'LzSelect'
})

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
})
const emits = defineEmits<SelectEmits>()
const slots = defineSlots()
const selectRef = ref<HTMLElement>()
const tooltipRef = ref<TooltipInstance>()
const inputRef = ref<InputInstance>()
const isDropdownVisible = ref(false)
const initialOption = findOption(props.modelValue)
const selectStates = reactive<SelectStates>({
  inputValue: initialOption?.label ?? "",
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightedIndex: -1,
})
const isDisabled = computed(() => props.disabled)
const children = computed(() => filter(slots.default?.(), (child) => eq(child.type, LzOption)))
const hasChildren = computed(() => size(children.value))
const showClear = computed(() =>
  props.clearable && selectStates.mouseHover && selectStates.inputValue !== ""
)
const highlightedLine = computed(() => {
  let result: SelectOptionProps | void
  if (hasChildren.value) {
    const node = children.value[selectStates.highlightedIndex]
    result = node?.props?.value
  } else {
    result = props.options[selectStates.highlightedIndex]
  }
  return result
})
const inputId = useId().value
const {
  wrapperRef: inputWrapperRef,
  isFocused,
  handleBlur,
  handleFocus,
} = useFocusController(inputRef)
useClickOutside(selectRef, (e) => handleClickOutside(e))
const focus: SelectInstance['focus'] = function () {
  inputRef.value?.focus()
}
const blur: SelectInstance['blur'] = function () {
  handleClickOutside()
}
function handleClickOutside(e?: Event) {
  if (isFocused.value) {
    nextTick(() => handleBlur(new FocusEvent('focus', e)))
  }
}
function toggleVisible() {
  if (isDisabled.value) return
  controlVisible(!isDropdownVisible.value)
}
function controlVisible(visible: boolean) {
  if (!tooltipRef.value) return
  get(tooltipRef, ['value', visible ? 'show' : 'hide'])?.()
  isDropdownVisible.value = visible
  emits('visible-change', visible)
  selectStates.highlightedIndex = -1
}
function findOption(value: string) {
  return find(props.options, (opt) => opt.value === value)
}
function handleClear() {
  inputRef.value?.clear()
  selectStates.inputValue = ""
  selectStates.selectedOption = null
  emits('clear')
  each(['change', 'update:modelValue'], k => emits(k as any, ""))
}
function renderLabel(option: SelectOptionProps): VNode | string {
  if (isFunction(props.renderLabel)) {
    return props.renderLabel(option)
  }
  return option.label
}
function handleSelect(option: SelectOptionProps) {
  if (option.disabled) return
  selectStates.inputValue = option.label
  selectStates.selectedOption = option
  each(['change', 'update:modelValue'], k => emits(k as any, option.value))
  controlVisible(false)
  inputRef.value?.focus()
}
function setSelected() {
  const option = findOption(props.modelValue)
  if (!option) return
  selectStates.inputValue = option.label
  selectStates.selectedOption = option
}
watch(() => props.modelValue, () => {
  setSelected()
})
provide<SelectContext>(SELECT_CTX_KEY, {
  handleSelect,
  selectStates,
  renderLabel,
  highlightedLine,
})
defineExpose({
  focus,
  blur
})
</script>
<template>
  <div class="lz-select" ref="selectRef" :class="{ 'is-disabled': isDisabled }" @click.stop="toggleVisible"
    @mouseenter="selectStates.mouseHover = true" @mouseleave="selectStates.mouseHover = false">
    <lz-tooltip ref="tooltipRef" placement="bottom-start" :popper-options="POPPER_OPTIONS"
      @click-outside="controlVisible(false)" manual>
      <template #default>
        <div ref="inputWrapperRef">
          <lz-input ref="inputRef" v-model="selectStates.inputValue" :id="inputId" :placeholder="placeholder"
            :disabled="isDisabled" :readonly="!filterable || !isDropdownVisible" @focus="handleFocus"
            @blur="handleBlur">
            <template #suffix>
              <lz-icon v-if="showClear" icon="circle-xmark" class="lz-input__clear" @click.stop="handleClear"
                @mousedown.prevent="noop"></lz-icon>
              <lz-icon v-else icon="angle-down" class="header-angle"
                :class="{ 'is-active': isDropdownVisible }"></lz-icon>
            </template>
          </lz-input>
        </div>
      </template>
      <template #content>
        <div class="lz-select__loading" v-if="selectStates.loading">
          <lz-icon icon="spinner" spin></lz-icon>
        </div>
        <ul class="lz-select__menu" v-else>
          <template v-if="!hasChildren">
            <lz-option v-for="item in options" :key="item.value" v-bind="item">
            </lz-option>
          </template>
          <template v-else>
            <slot></slot>
          </template>
        </ul>
      </template>
    </lz-tooltip>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>