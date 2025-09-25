import { ref, getCurrentInstance, inject, computed, provide, unref } from "vue";
import type { MaybeRef, Ref, App } from "vue";

import {
  type ConfigProvideContext,
  ConfigProvideContextKey,
} from "./constants";

import { createI18n, i18nSymbol } from "vue3-i18n";
import type { TranslatePair } from "@lz-element/locale";
import English from "@lz-element/locale/lang/en";
import { merge } from "lodash-es";
import { debugWarn } from "@lz-element/utils";

const globalConfig = ref<ConfigProvideContext>();

export function useGlobalConfig<
  k extends keyof ConfigProvideContext,
  D extends ConfigProvideContext[k]
>(key: k, defaultValue?: D): Ref<Exclude<ConfigProvideContext[k], void>>;
export function useGlobalConfig(): Ref<ConfigProvideContext>;
export function useGlobalConfig(
  key?: keyof ConfigProvideContext,
  defaultValue = void 0
) {
  const config = getCurrentInstance()
    ? inject(ConfigProvideContextKey, globalConfig)
    : globalConfig;
  return key ? computed(() => config.value?.[key] ?? defaultValue) : config;
}

const _createI18n = (opts?: ConfigProvideContext) => {
  const mergeMsg = (msg: TranslatePair) =>
    merge(msg, opts?.extendsI18nMsg ?? {});
  if (!opts?.locale) {
    return createI18n({
      locale: "en",
      messages: mergeMsg({
        en: English.el,
      }),
    });
  }
  return createI18n({
    locale: opts.locale?.name || "en",
    messages: mergeMsg({
      en: English.el,
      [opts.locale?.name]: opts.locale?.el ?? {},
    }),
  });
};
export function ProvideGlobalConfig(
  config: MaybeRef<ConfigProvideContext> = { locale: English },
  app?: App,
  global = false
) {
  const instance = getCurrentInstance();
  const oldCfg = instance ? useGlobalConfig() : void 0;
  const provideFn = app?.provide ?? (instance ? provide : void 0);

  if (!provideFn) {
    debugWarn(
      "ProvideGlobalConfig",
      "ConfigProvider is missing global configuration. Please make sure the component is"
    );
    return;
  }

  const context = computed(() => {
    const cfg = unref(config);
    if (!oldCfg?.value) return cfg;
    return merge(oldCfg.value, cfg);
  });

  const i18n = computed(() => _createI18n(context.value));
  provideFn(ConfigProvideContextKey, context);
  provideFn(i18nSymbol, i18n.value);
  if (app) {
    app.use(i18n.value);
  }
  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }
  return context;
}
