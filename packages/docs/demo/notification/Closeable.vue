<script lang="ts" setup>
import {LzNotification} from 'lz-element'

const open = () => {
  LzNotification.success({
    title: 'Info',
    message: 'This is a message without close button',
    showClose: false,
  })
}
</script>

<template>
  <lz-button plain @click="open"> Hide close button </lz-button>
</template>