<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { SwitchProps, SwitchEmits, SwitchInstance } from './types'
import { debugWarn } from '@lz-element/utils';
import { useFormItem, useFormDisabled, useFormItemInputId } from "../Form";

defineOptions({
  name: 'LzSwitch',
  inheritAttrs: false
})
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
})
const isDisabled = useFormDisabled();
const { formItem } = useFormItem();
const { inputId } = useFormItemInputId(props, formItem);
const emits = defineEmits<SwitchEmits>()
const innerValue = ref(props.modelValue)
const inputRef = ref<HTMLInputElement>()
const checked = computed(() => innerValue.value === props.activeValue)
const focus: SwitchInstance['focus'] = function () {
  inputRef.value?.focus()
}
function handleChange() {
  if (isDisabled.value) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('update:modelValue', newValue)
  emits('change', newValue)
  inputRef.value?.focus()
}
onMounted(() => {
  inputRef.value!.checked = checked.value
})
watch(checked, (val) => {
  inputRef.value!.checked = val
  formItem?.validate("change").catch((err) => debugWarn(err));
})
defineExpose<SwitchInstance>({
  focus,
  checked
})
</script>
<template>
  <div class="lz-switch" :class="{
    [`lz-switch--${size}`]: size,
    'is-disabled': isDisabled,
    'is-checked': checked,
  }" @click="handleChange">
    <input class="lz-switch__input" type="checkbox" role="switch" ref="inputRef" :id="inputId" :name="name"
      :checked="checked" :disabled="isDisabled" @keydown.enter="handleChange"
      @blur="formItem?.validate('blur').catch((err) => debugWarn(err))" />
    <div class="lz-switch__core">
      <div class="lz-switch__core-inner">
        <span v-if="activeText || inactiveText" class="lz-switch__core-inner-text">{{ checked ? activeText :
          inactiveText
        }}</span>
      </div>
      <div class="lz-switch__core-action"></div>
    </div>
  </div>
</template>
<style>
@import './style.css';
</style>