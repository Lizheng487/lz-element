<script setup lang="ts">
import type { DropdownProps, DropdownItemProps, DropdownEmits, DropdownInstance, DropdownContext } from "./types";
import { ref, computed, provide } from "vue";
import type { TooltipInstance } from "../Tooltip/types";
import { omit, isNil } from "lodash-es";
import LzDropdownItem from "./DropdownItem.vue";
import LzTooltip from "../Tooltip/Tooltip.vue";

import { useDisabledStyle } from "@lz-element/hooks";
import { DROPDOWN_CTX_KEY } from "./constants";
import { type ButtonInstance, LzButton, LzButtonGroup } from "../Button/index";
defineOptions({
  name: "LzDropdown",
  inheritAttrs: false
});

const props = withDefaults(defineProps<DropdownProps>(), {
  items: () => [] as DropdownItemProps[],
  hideOnClick: true,
});
const emits = defineEmits<DropdownEmits>();
const slots = defineSlots();
const tooltipRef = ref<TooltipInstance>();
const triggerRef = ref<ButtonInstance>();
const tooltipProps = computed(() => omit(props, ['items', 'hideAfterClick', 'size', 'type', 'splitButton']))
const virtualRef = computed(() => triggerRef.value?.ref ?? void 0)
function handleItemClick(e: DropdownItemProps) {
  props.hideOnClick && tooltipRef.value?.hide()
  !isNil(e.command) && emits('command', e.command)
}

!TEST && useDisabledStyle()
provide<DropdownContext>(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size)
})

defineExpose<DropdownInstance>({
  open: () => tooltipRef.value?.show(),
  close: () => tooltipRef.value?.hide(),
})
</script>

<template>
  <div class="lz-dropdown" :class="{ 'is-disabled': props.disabled }">
    <lz-tooltip ref="tooltipRef" v-bind="tooltipProps" :virtual-triggering="splitButton"
      :virtual-ref="virtualRef?.value" @visible-change="$emit('visible-change', $event)">
      <lz-button-group v-if="splitButton" :type="type" :size="size" :disabled="disabled">
        <lz-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </lz-button>
        <lz-button ref="triggerRef" icon="angle-down" />
      </lz-button-group>
      <slot name="default" v-else>

      </slot>

      <template #content>
        <div class="lz-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command">
              <lz-dropdown-item v-bind="item" />
            </template>
          </slot>
        </div>
      </template>

    </lz-tooltip>
  </div>
</template>
<style scoped>
@import "./style.css";

:deep(.lz-button-group) {
  &> :last-child {
    padding: 5px 7px;
  }
}
</style>