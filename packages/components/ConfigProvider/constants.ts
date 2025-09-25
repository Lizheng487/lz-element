import type { ConfigProvideProps } from "./types";
import type { InjectionKey, Ref } from "vue";
export type ConfigProvideContext = Partial<ConfigProvideProps>;
export const ConfigProvideContextKey: InjectionKey<Ref<ConfigProvideContext>> =
  Symbol();
