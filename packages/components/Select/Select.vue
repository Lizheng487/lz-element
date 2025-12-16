<script setup lang="ts">
import { computed, h, nextTick, onMounted, provide, reactive, ref, watch, type VNode } from 'vue';
import { POPPER_OPTIONS, SELECT_CTX_KEY } from './constants';
import type { SelectProps, SelectInstance, SelectContext, SelectEmits, SelectStates, SelectOptionProps } from './types'
import { useFocusController, useClickOutside } from '@lz-element/hooks';
import type { TooltipInstance } from '../Tooltip';
import type { InputInstance } from '../Input';
import { each, eq, filter, find, get, size, noop, isFunction, map, assign, isNil, isBoolean, includes, debounce } from 'lodash-es';
import LzOption from './Option.vue'
import LzTooltip from '../Tooltip/Tooltip.vue';
import LzInput from '../Input/Input.vue';
import LzIcon from '../Icon/Icon.vue';
import { debugWarn, RenderVnode } from '@lz-element/utils';
import useKeyMap from './useKeyMap';
import { useFormItem, useFormDisabled, useFormItemInputId } from "../Form";

const COMPONENT_NAME = 'LzSelect' as const;

defineOptions({
  name: 'LzSelect'
})

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
})
const emits = defineEmits<SelectEmits>()
const slots = defineSlots()
const isDisabled = useFormDisabled();
const { formItem } = useFormItem();
const { inputId } = useFormItemInputId(props, formItem);
const selectRef = ref<HTMLElement>()
const tooltipRef = ref<TooltipInstance>()
const inputRef = ref<InputInstance>()
const filteredChilds = ref<Map<VNode, SelectOptionProps>>(new Map())
const filteredOptions = ref(props.options ?? [])
const isDropdownVisible = ref(false)
const initialOption = findOption(props.modelValue)
const selectStates = reactive<SelectStates>({
  inputValue: initialOption?.label ?? "",
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightedIndex: -1,
})
const children = computed(() => filter(slots.default?.(), (child) => eq(child.type, LzOption)))
const hasChildren = computed(() => size(children.value))
const showClear = computed(() =>
  props.clearable && selectStates.mouseHover && selectStates.inputValue !== ""
)
const highlightedLine = computed(() => {
  let result: SelectOptionProps | void
  if (hasChildren.value) {
    // const node = children.value[selectStates.highlightedIndex]
    // result = node?.props?.value
    const node = [...filteredChilds.value][selectStates.highlightedIndex]?.[0]
    result = filteredChilds.value.get(node)
  } else {
    result = filteredOptions.value[selectStates.highlightedIndex]
  }
  return result
})

const childrenOptions = computed(() => {
  if (!hasChildren.value) return []
  return map(children.value, (item) => ({
    vNode: h(item),
    props: assign(item.props, {
      disabled: item.props?.disabled === true ||
        (!isNil(item.props?.disabled) && !isBoolean(item.props?.disabled))
    }),
  }))
})
const isNoData = computed(() => {
  if (!props.filterable) return false
  if (!hasData.value) return true
  return false
})
const hasData = computed(() =>
  (hasChildren.value && filteredChilds.value.size > 0) ||
  (!hasChildren.value && size(filteredOptions.value) > 0))
const lastIndex = computed(() => hasChildren.value ? filteredChilds.value.size - 1 : size(filteredOptions.value) - 1)
function handleFilter() {
  const searchKey = selectStates.inputValue
  selectStates.highlightedIndex = -1
  if (hasChildren.value) {
    genFilterChilds(searchKey)
    return
  }
  genFilterOptions(searchKey)
}
function setFilteredChilds(opts: typeof childrenOptions.value) {
  filteredChilds.value.clear()
  each(
    opts,
    (item) => { filteredChilds.value.set(item.vNode, item.props as SelectOptionProps) }
  )
}
async function genFilterChilds(searchKey: string) {
  if (!props.filterable) return
  if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    await callRemoteMethod(props.remoteMethod, searchKey)
    setFilteredChilds(childrenOptions.value)
    return
  }
  if (props.filterMethod && isFunction(props.filterMethod)) {
    const opts = map(props.filterMethod(searchKey), 'value')
    setFilteredChilds(filter(childrenOptions.value, item => includes(opts, get(item, ['props', 'value']))))
    return
  }
  setFilteredChilds(filter(childrenOptions.value, item => includes(get(item, ['props', 'label']), searchKey)))
}
async function genFilterOptions(searchKey: string) {
  if (!props.filterable) return
  if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    filteredOptions.value = await callRemoteMethod(props.remoteMethod, searchKey)
    return
  }
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchKey)
    return
  }
  filteredOptions.value = filter(props.options, (opt) => includes(opt.label, searchKey))
}
async function callRemoteMethod(method: Function, searchKey: string) {
  if (!method || !isFunction(method)) return
  selectStates.loading = true
  let result
  try {
    result = await method(searchKey)
  } catch (error) {
    debugWarn(error as Error)
    debugWarn(COMPONENT_NAME, '[LzElement] Select: callRemoteMethod error!')
    result = []
    return Promise.reject(error)
  }
  return result
}
const filterplaceholder = computed(() =>
  props.filterable && selectStates.selectedOption && isDropdownVisible.value ? selectStates.selectedOption.label : props.placeholder)
const timeout = computed(() => props.remote ? 300 : 100);
const handleFilterDebounce = debounce(handleFilter, timeout.value)
const {
  wrapperRef: inputWrapperRef,
  isFocused,
  handleBlur,
  handleFocus,
} = useFocusController(inputRef)
useClickOutside(selectRef, (e) => handleClickOutside(e))
const keyMap = useKeyMap({
  isDropdownVisible,
  highlightedLine,
  hasData,
  lastIndex,
  selectStates,
  controlVisible,
  handleSelect,
})
function handleKeyDown(e: KeyboardEvent) {
  keyMap.has(e.key) && keyMap.get(e.key)?.(e)
}
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
  props.filterable && controlInputVal(visible)
  isDropdownVisible.value = visible
  emits('visible-change', visible)
  selectStates.highlightedIndex = -1
}
function controlInputVal(visible: boolean) {
  if (!props.filterable) return
  if (visible) {
    if (selectStates.selectedOption) selectStates.inputValue = ''
    handleFilterDebounce()
    return
  }
  selectStates.inputValue = selectStates.selectedOption?.label ?? ""
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
  formItem?.clearValidate();
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
watch(() => props.options, (newVal) => {
  filteredOptions.value = newVal ?? []
})
watch(() => childrenOptions.value, (newVal) => setFilteredChilds(newVal), { immediate: true })
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      formItem?.validate("change").catch((err) => debugWarn(err));
    }
    setSelected();
  }
);

onMounted(() => {
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
          <lz-input ref="inputRef" v-model="selectStates.inputValue" :id="inputId"
            :placeholder="filterable ? filterplaceholder : placeholder" :disabled="isDisabled"
            :readonly="!filterable || !isDropdownVisible" @focus="handleFocus" @blur="handleBlur"
            @input="handleFilterDebounce" @keydown="handleKeyDown">
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
        <div class="lz-select__nodata" v-else-if="filterable && isNoData">
          No Data
        </div>
        <ul class="lz-select__menu" v-else>
          <template v-if="!hasChildren">
            <lz-option v-for="item in filteredOptions" :key="item.value" v-bind="item">
            </lz-option>
          </template>
          <template v-else>
            <template v-for="[vNode, _props] in filteredChilds" :key="_props.value">
              <render-vnode :vNode="vNode"></render-vnode>
            </template>
          </template>
        </ul>
      </template>
    </lz-tooltip>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>