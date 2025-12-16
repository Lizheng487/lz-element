<script setup lang="ts">
import type { InputProps, InputEmits, InputInstance } from './types'
import { ref, computed, watch, useAttrs, shallowRef, nextTick } from 'vue'
import { useFocusController } from '@lz-element/hooks';
import LzIcon from '../Icon/Icon.vue';
import { noop, each } from 'lodash-es';
import { useFormItem, useFormDisabled, useFormItemInputId } from '../Form'
import { debugWarn } from '@lz-element/utils';

defineOptions({
  name: 'LzInput',
  inheritAttrs: false
})
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off',
})
const emits = defineEmits<InputEmits>()

const innerValue = ref(props.modelValue)
const pwdVisible = ref(false)
const inputRef = shallowRef<HTMLInputElement>()
const textareaRef = shallowRef<HTMLTextAreaElement>()
const _ref = computed(() => inputRef.value || textareaRef.value)
const isDisabled = useFormDisabled()
const attrs = useAttrs()
const showClear = computed(() => props.clearable && !!innerValue.value && !isDisabled.value && isFocused.value)
const showPwdArea = computed(() => props.type === 'password' && props.showPassword && !isDisabled.value && !!innerValue.value)
const { formItem } = useFormItem()
const { inputId } = useFormItemInputId(props, formItem)
const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(_ref, {
  afterBlur() {
    //form 校验
    formItem?.validate('blur').catch(err => debugWarn(err))
  }
})

const clear: InputInstance['clear'] = function () {
  innerValue.value = ''
  each(['update:modelValue', 'input', 'change'], (e) => emits(e as any, ''))
  emits('clear')
  formItem?.clearValidate();
}
const focus: InputInstance['focus'] = async function () {
  await nextTick()
  _ref.value?.focus()
}
const blur: InputInstance['blur'] = function () {
  _ref.value?.blur()
}
const select: InputInstance['select'] = function () {
  _ref.value?.select()
}
function handleInput() {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}
function handleChange() {
  emits('change', innerValue.value)
}
function togglePwdVisible() {
  pwdVisible.value = !pwdVisible.value
}
watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue
  formItem?.validate('change').catch(err => debugWarn(err))
})

defineExpose<InputInstance>({
  ref: _ref,
  focus,
  blur,
  select,
  clear,
})
</script>

<template>
  <div class="lz-input" :class="{
    [`lz-input--${size}`]: size,
    [`lz-input--${type}`]: type,
    'is-disabled': isDisabled,
    'is-prepend': $slots.prepend,
    'is-append': $slots.append,
    'is-prefix': $slots.prefix,
    'is-suffix': $slots.suffix,
    'is-focus': isFocused,
  }">

    <template v-if="type !== 'textarea'">
      <div class="lz-input__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="lz-input__wrapper" ref="wrapperRef">
        <span v-if="$slots.prefix" class="lz-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input ref="inputRef" class="lz-input__inner" :id="inputId"
          :type="showPassword ? (pwdVisible ? 'text' : 'password') : type" :disabled="isDisabled" :readonly="readonly"
          :autocomplete="autocomplete" :autofocus="autofocus" :form="form" :placeholder="placeholder"
          v-model="innerValue" v-bind="attrs" @input="handleInput" @change="handleChange" @focus="handleFocus"
          @blur="handleBlur" />
        <span v-if="$slots.suffix || showClear || showPwdArea" class="lz-input__suffix">
          <slot name="suffix"></slot>
          <lz-icon icon="circle-xmark" v-if="showClear" class="lz-input__clear" @click="clear"
            @mousedown.prevent="noop"></lz-icon>
          <lz-icon icon="eye" v-if="showPwdArea && pwdVisible" class="lz-input__password"
            @click="togglePwdVisible"></lz-icon>
          <lz-icon icon="eye-slash" v-if="showPwdArea && !pwdVisible" class="lz-input__password"
            @click="togglePwdVisible"></lz-icon>
        </span>
      </div>
      <div v-if="$slots.append" class="lz-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea class="lz-textarea__wrapper" ref="textareaRef" :id="inputId" :disabled="isDisabled" :readonly="readonly"
        :autocomplete="autocomplete" :autofocus="autofocus" :form="form" :placeholder="placeholder" v-model="innerValue"
        v-bind="attrs" @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur"></textarea>
    </template>

  </div>
</template>
<style scoped>
@import "./style.css";
</style>