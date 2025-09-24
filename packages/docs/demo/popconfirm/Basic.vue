<script setup lang="ts">
import { ja, ko, en, zhCn, zhTw, LzConfigProvider } from "lz-element";
import { get } from "lodash-es";

import { computed, ref } from "vue";

const language = ref("");
const langMap = {
  ja,
  ko,
  en,
  zhCn,
  zhTw,
} as const;
const locale = computed(() => get(langMap, language.value));
const changelang = () => {
  const l = ["zhCn", "zhTw", "ko", "en", "ja"];
  language.value = l[(l.indexOf(language.value) + 1) % l.length];
};
</script>
<template>
  <lz-button @click="changelang" type="info" style="margin-right: 20px"
    >change language</lz-button
  >
  <lz-config-provider :locale="locale">
    <lz-popconfirm title="Are you shure to delete this item?">
      <lz-button>Delete</lz-button>
    </lz-popconfirm>
  </lz-config-provider>
</template>
