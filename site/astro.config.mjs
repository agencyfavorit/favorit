// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://favorit.agency';

/** Пути, которые не должны попадать в sitemap (служебные и noindex-страницы). */
const SITEMAP_EXCLUDE = ['/404/', '/privacy/', '/offer/'];

/**
 * Подмножества шрифта и их unicode-range (как в Fontsource): браузер скачивает
 * только те файлы, символы которых реально есть на странице.
 */
const SUBSETS = {
  cyrillic: 'U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116',
  latin:
    'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  'latin-ext':
    'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
};

/**
 * Вариативный шрифт из пакета Fontsource, отдаваемый со своего домена.
 * @param {string} name
 * @param {`--${string}`} cssVariable
 * @param {string} slug
 */
const selfHosted = (name, cssVariable, slug) => ({
  provider: fontProviders.local(),
  name,
  cssVariable,
  fallbacks: ['system-ui', 'sans-serif'],
  options: {
    variants: /** @type {[any, ...any[]]} */ (
      Object.entries(SUBSETS).map(([subset, range]) => ({
        src: [`@fontsource-variable/${slug}/files/${slug}-${subset}-wght-normal.woff2`],
        weight: '400 800',
        style: 'normal',
        display: 'swap',
        unicodeRange: [range],
      }))
    ),
  },
});

export default defineConfig({
  site: SITE,
  // Адреса со слешем и без открываются одинаково; канонические ссылки всегда со слешем.
  trailingSlash: 'ignore',
  // ~6 КБ CSS (gzip) встраиваем в HTML: ни одного блокирующего отрисовку запроса.
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  // Markdown на сайте нет; подсветка Shiki несовместима с CSP — отключаем явно.
  markdown: { syntaxHighlight: false },

  integrations: [
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.some((path) => page === SITE + path),
      i18n: { defaultLocale: 'ru', locales: { ru: 'ru-RU', en: 'en-US' } },
    }),
  ],

  // Шрифты раздаём со своего домена: без запросов к Google и с метрико-подогнанным fallback (нет скачка вёрстки).
  fonts: [
    selfHosted('Wix Madefor Display', '--font-display', 'wix-madefor-display'),
    selfHosted('Wix Madefor Text', '--font-text', 'wix-madefor-text'),
  ],

  image: {
    // Фото — основной вес страницы. Качество подобрано отдельно под каждый кодек:
    // у AVIF шкала «жёстче», поэтому 52 визуально ≈ WebP 76 ≈ JPEG 78, при этом файл в 1,5–2 раза легче.
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        avif: { quality: 52, effort: 6, chromaSubsampling: '4:2:0' },
        webp: { quality: 76, effort: 5, smartSubsample: true },
        jpeg: { quality: 78, mozjpeg: true, progressive: true },
      },
    },
  },

  // Хэши для всех скриптов и стилей, которые выводит Astro; остальное — только со своего домена.
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://formsubmit.co",
        "form-action 'self' https://formsubmit.co",
        "base-uri 'self'",
        "object-src 'none'",
        // upgrade-insecure-requests — только в заголовке Netlify: в <meta> Safari переписывает
        // и локальные http-запросы на https, и картинки в превью не грузятся.
      ],
    },
  },
});
