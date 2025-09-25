import type { language, TranslatePair } from "@lz-element/locale";

export interface ConfigProvideProps {
  locale?: language;
  extendsI18nMsg?: TranslatePair;
}
