import { createApp } from "vue";
import "lz-element/dist/index.css";
import App from "./App.vue";
import LzElemnet, { zhCn } from "lz-element";

createApp(App).use(LzElemnet, { locale: zhCn }).mount("#app");
