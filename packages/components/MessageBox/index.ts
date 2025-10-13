import { set } from "lodash-es";
import MessageBox from "./methods";
import type { App } from "vue";

export const LzMessageBox = MessageBox;
set(LzMessageBox, "install", (app: App) => {
  app.config.globalProperties.$messageBox = MessageBox;
  app.config.globalProperties.$msgbox = MessageBox;
  app.config.globalProperties.$alert = MessageBox.alert;
  app.config.globalProperties.$confirm = MessageBox.confirm;
  app.config.globalProperties.$prompt = MessageBox.prompt;
});
export default LzMessageBox;
export * from "./types";
