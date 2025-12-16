import Form from "./Form.vue";
import FormItem from "./FormItem.vue";
import { withInstall } from "@lz-element/utils";

export const LzForm = withInstall(Form);
export const LzFormItem = withInstall(FormItem);

export * from "./types";
export * from "./hooks";
