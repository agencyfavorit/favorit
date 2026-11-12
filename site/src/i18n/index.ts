import type { Dict, Locale, ServiceId } from './types';
import { ru } from './ru';
import { en } from './en';

export const dictionaries: Record<Locale, Dict> = { ru, en };

export const locales = Object.keys(dictionaries) as Locale[];

export const getDict = (locale: Locale): Dict => dictionaries[locale];

/** Порядок направлений един для всех языков — берём из основного словаря. */
export const serviceIds: readonly ServiceId[] = ru.services.items.map((s) => s.id);

/** Языковые версии одной страницы: для hreflang и переключателя языка. */
export type Alternates = Readonly<Record<Locale, string>>;

export const homeAlternates: Alternates = { ru: ru.path, en: en.path };

export const servicePath = (locale: Locale, id: ServiceId): string => `${dictionaries[locale].path}${id}/`;

export const serviceAlternates = (id: ServiceId): Alternates => ({
  ru: servicePath('ru', id),
  en: servicePath('en', id),
});

export type { Dict, Locale, QA, Service, ServiceId } from './types';
