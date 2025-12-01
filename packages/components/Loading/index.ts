import { vLoading } from "./directive";
import { Loading } from "./service";
import type { App } from "vue";

export const LzLoading = {
  name: "LzLoading",
  install(app: App) {
    app.directive("loading", vLoading);
    app.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading,
};
export default LzLoading;
export {
  vLoading,
  vLoading as LzLoadingDirective,
  Loading as LzLoadingService,
};
export * from "./types";
