import type { Locale } from '@/i18n/types';

const NBSP = ' ';

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, (c) => ESCAPES[c] ?? c);

/**
 * Короткие служебные слова, которые не должны оставаться в конце строки:
 * предлоги, союзы и частицы — правило русской типографики про «висячие» предлоги.
 */
const RU_SHORT =
  /(^|[\s(«„])(а|в|во|и|к|ко|о|об|с|со|у|я|на|не|ни|но|по|до|за|из|от|ли|же|бы|для|без|под|над|при|про|что|как|или)\s+/giu;
const EN_SHORT = /(^|\s)(a|an|the|of|to|in|on|at|by|or|and|&)\s+/giu;

/** Неразрывный пробел после коротких слов (дважды — для цепочек «и в», «а на»). */
const bindShortWords = (s: string, locale: Locale): string => {
  const re = locale === 'ru' ? RU_SHORT : EN_SHORT;
  return s.replace(re, `$1$2${NBSP}`).replace(re, `$1$2${NBSP}`);
};

/**
 * Готовит строку словаря к выводу через `set:html`:
 * экранирует HTML, связывает короткие слова и тире с соседями,
 * не даёт разорвать слова через дефис («веб-сервисы», «e-commerce»),
 * а `\n` превращает в перенос строки.
 */
export function typo(text: string, locale: Locale): string {
  let s = bindShortWords(text, locale);
  s = s.replace(/ (—|–)/g, `${NBSP}$1`);
  return s
    .split('\n')
    .map((line) =>
      escapeHtml(line).replace(/[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)+/gu, (word) => `<span class="nw">${word}</span>`),
    )
    .join('<br>');
}
