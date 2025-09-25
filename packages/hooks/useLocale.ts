import { inject, type Ref } from "vue";
import { omit } from "lodash-es";
import { createI18n, i18nSymbol, type I18nInstance } from "vue3-i18n";
import type { language } from "@lz-element/locale";
import English from "@lz-element/locale/lang/en";

export function useLocale(localeOverrids?: Ref<language>) {
  if (!localeOverrids) {
    return omit(
      <I18nInstance>(
        inject(
          i18nSymbol,
          createI18n({ locale: English.name, messages: { en: English.el } })
        )
      ),
      "install"
    );
  }
  return omit(
    createI18n({
      locale: localeOverrids.value.name,
      messages: {
        en: English.el,
        [localeOverrids.value.name]: localeOverrids.value.el,
      },
    }),
    "install"
  );
}
export default useLocale;
