import { each } from "lodash-es";
import type { App, Plugin } from "vue";
import {
  ProvideGlobalConfig,
  type ConfigProvideProps,
} from "@lz-element/components";
export function makeInstaller(components: Plugin[]) {
  const install = (app: App, opts?: ConfigProvideProps) => {
    each(components, (c) => {
      app.use(c);
    });
    if (opts) {
      ProvideGlobalConfig(opts, app, true);
    }
  };

  return install as Plugin;
}
export default makeInstaller;
