<script setup lang="ts">
import type { ConfigProvideProps } from './types'
import { ProvideGlobalConfig } from './hooks'

defineOptions({
  name: 'LzConfigProvider'
})
const props = defineProps<ConfigProvideProps>()
const config = ProvideGlobalConfig(props)

</script>
<template>
  <slot name="default" :config="config"></slot>
</template>