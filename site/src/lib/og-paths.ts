import { locales, serviceIds, type Locale, type ServiceId } from '@/i18n';

/**
 * Карточки для соцсетей генерируются при сборке (src/pages/og/[key].jpg.ts).
 * Ключи: `ru`, `en` — главные; `ru-web`, `en-ai` и т.п. — страницы услуг.
 */
export const ogImagePath = (key: string): string => `/og/${key}.jpg`;

export const ogServiceKey = (locale: Locale, id: ServiceId): string => `${locale}-${id}`;

/** type, а не interface: пропсы getStaticPaths должны быть совместимы с Record<string, unknown>. */
export type OgEntry = {
  key: string;
  locale: Locale;
  service?: ServiceId;
};

export const ogEntries = (): OgEntry[] =>
  locales.flatMap((locale) => [
    { key: locale, locale },
    ...serviceIds.map((service) => ({ key: ogServiceKey(locale, service), locale, service })),
  ]);
