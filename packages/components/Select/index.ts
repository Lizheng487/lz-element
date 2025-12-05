import Select from "./Select.vue";
import Option from "./Option.vue";
import { withInstall } from "@lz-element/utils";

export const LzSelect = withInstall(Select);
export const LzOption = withInstall(Option);

export * from "./types";
