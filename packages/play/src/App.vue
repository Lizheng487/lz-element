<script setup lang="ts">
import { LzLoading, LzMessageBox, LzNotification, LzMessage, LzButtonGroup, LzPopconfirm, zhCn, type DropdownItemProps, zhTw, ko, en, ja, LzConfigProvider } from 'lz-element';
import { reactive, ref, h, computed } from 'vue';
import { get } from 'lodash-es';
const loading = ref(false);
const switchval = ref(1);
const options = ref([
  {
    label: "Option A",
    value: "a",
  },
  {
    label: "Option B",
    value: "b",
  },
  {
    label: "Option C",
    value: "c",
  },
  {
    label: "Option lz",
    value: "lz",
    disabled: true,
  },
  {
    label: "Option E",
    value: "e",
  },
]);
const values = ref("")
function openLoading1() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}
function openLoading2() {
  const _loading = LzLoading.service({
    lock: true,
    spinner: "circle-notch",
    text: "加载中...",
    background: "rgba(255,255,255,0.5)",
  });
  setTimeout(() => {
    _loading.close();
  }, 2000);
}
function openConfirm() {
  LzMessageBox.confirm("确认删除吗？", "确认消息", {
    title: "标题",
    type: "warning",
    showClose: true,
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  });
}
const form = reactive({
  name: "123",
  desc: "22",
})
function openNotify() {
  LzNotification({
    title: "This is a message",
    message: h("i", { style: "color:teal" }, "This is a remider.  top-right"),
    position: 'top-right'
  })
}
function openNotify1() {
  LzNotification({
    title: "Title",
    message: h("i", { style: "color:teal" }, "This is a remider.  bottom-right"),
    position: 'bottom-right'
  });
}
const open1 = () => {
  LzMessage({
    showClose: true,
    message: "This is a message.",
  })
}
const items: DropdownItemProps[] = [
  {
    command: "a",
    label: "a",
    disabled: false,
  },
  {
    command: "b",
    label: "b",
    disabled: true,
    divided: true,

  },
  {
    command: "c",
    label: "c",
    disabled: true,
  },
];
let activeName = reactive({
  accordion: true,
  modelValue: ["a"],
});
const language = ref("")
const langMap = {
  ja,
  en,
  ko,
  zhCn,
  zhTw,
} as const;
const locale = computed(() => get(langMap, language.value));
const changelang = () => {
  const l = ["zhCn", "zhTw", 'ko', "en", "ja"];
  language.value = l[(l.indexOf(language.value) + 1) % l.length];
}
</script>

<template>
  <lz-input v-model="values" clearable></lz-input>
  <lz-input v-model="form.name" show-password type="password"></lz-input>
  <lz-input v-model="form.desc" type="textarea"></lz-input>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <lz-switch v-model="switchval" size="large" :active-value="0" :inactive-value="1"> </lz-switch>
  <lz-button v-loading.fullscreen.lock="loading" @click="openLoading1" type="primary">openLoading1</lz-button>
  <lz-button @click="openLoading2" type="primary">openLoading</lz-button>
  <lz-button @click="open1" type="primary">message</lz-button>
  <lz-button @click="openNotify" type="primary">Notification-top</lz-button>
  <lz-button @click="openNotify1" type="primary">Notification-bottom</lz-button>
  <lz-button type="info" @click="openConfirm">openConfirm</lz-button>
  <lz-popconfirm title="确定要删除吗？" icon="el-icon-info" icon-color="red" @confirm="() => {
    console.log('confirm');
  }" @cancel="() => {
    console.log('cancel');
  }">
    <lz-button type="primary">删除</lz-button>
  </lz-popconfirm>
  <LzButton type="primary" size="large" icon="search" plain>111111111</LzButton>
  <lz-button-group>
    <lz-button type="primary"><lz-icon icon="angle-left"></lz-icon>上一页</lz-button>
    <lz-button type="primary">下一页<lz-icon icon="angle-right"></lz-icon></lz-button>
  </lz-button-group>
  <lz-collapse v-bind="activeName">
    <lz-collapse-item name="a" title="Title a">
      <div>this is content a</div>
    </lz-collapse-item>
    <lz-collapse-item name="b" title="title b">
      <div>this is content b</div>
    </lz-collapse-item>
    <lz-collapse-item name="c" title="title c  disable" disabled>
      <div>this is content c</div>
    </lz-collapse-item>
  </lz-collapse>
  <lz-tooltip content="This is a tooltip" placement="top" trigger="hover">
    <lz-button type="primary">Hover me</lz-button>
  </lz-tooltip>
  <lz-dropdown :items="items">
    <span class="dropdown-link">Dropdown List <lz-icon icon="angle-down"></lz-icon></span>
  </lz-dropdown>
  <lz-button @click="changelang" type="info">change language</lz-button>
  <lz-config-provider :locale="locale">
    <lz-popconfirm title="Are you sure to delete this?">
      <lz-button type="danger">Danger</lz-button>
    </lz-popconfirm>
  </lz-config-provider>
  <lz-select v-model="values" clearable placeholder="请选择" filterable>
    <lz-option value="1" label="111">
    </lz-option>
    <lz-option value="2" label="222">
    </lz-option>
    <!-- <lz-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </lz-option> -->
  </lz-select>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
