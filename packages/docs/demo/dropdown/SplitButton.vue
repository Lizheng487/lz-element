<script setup lang="ts">
import { type DropdownItemProps, LzMessage } from "lz-element";

const items: DropdownItemProps[] = [
  { command: "1", label: "Action 1" },
  { command: "2", label: "Action 2" },
  { command: "3", label: "Action 3", disabled: true },
  { command: "4", label: "Action 4", divided: true },
];

function handleClick() {
  LzMessage.info("button click");
}
</script>

<template>
  <div class="row">
    <lz-dropdown :items="items">
      <lz-button type="primary">
        Dropdown List
        <lz-icon icon="angle-down" style="margin-left: 8px" />
      </lz-button>
    </lz-dropdown>
    <lz-dropdown
      :items="items"
      type="primary"
      @click="handleClick"
      split-button
    >
      Dropdown List
    </lz-dropdown>
  </div>
</template>

<style scoped>
.row div {
  margin-right: 16px;
}
</style>
