<script setup lang="ts">
import type { DropdownItemProps } from './types'
import { DROPDOWN_CTX_KEY } from './constants'
import { inject, computed } from 'vue'
import { useId } from '@lz-element/hooks'

defineOptions({
  name: 'LzDropdownItem'
})
const props = withDefaults(defineProps<DropdownItemProps>(), {
  command: useId().value,
  divided: false,
  disabled: false
})
const ctx = inject(DROPDOWN_CTX_KEY)
const size = computed(() => ctx?.size.value)


function handleClick() {
  if (props.disabled) return
  ctx?.handleItemClick(props)
}

</script>
<template>
  <li v-if="divided" role="separator" class="divided-placeholder"></li>
  <li :id="`dropdown-item-${command ?? useId().value}`" :class="{
    'is-disabled': disabled,
    'lz-dropdown__item': true,
    ['lz-dropdown__item--' + size]: size,
    'is-divided': divided,
  }" @click="handleClick">
    <slot>{{ label }}</slot>
  </li>
</template>
<style scoped>
@import "./style.css";
</style>