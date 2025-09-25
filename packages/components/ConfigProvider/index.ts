import ConfigProvider from "./ConfigProvider.vue";
import { withInstall } from "@lz-element/utils";
export const LzConfigProvider = withInstall(ConfigProvider);
export * from "./types";
export * from "./hooks";