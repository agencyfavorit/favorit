import type { ImageMetadata } from 'astro';

export type Locale = 'ru' | 'en';

/** Строка заголовка; `\n` — принудительный перенос строки в макете. */
export type Lines = string;

export interface NavLink {
  href: `#${string}`;
  label: string;
  /** Количество пунктов в разделе — выводится как «[6]» рядом со ссылкой. */
  count?: number;
}

export type ServiceId = 'web' | 'mobile' | 'ai' | 'backend' | 'design' | 'web3';

export interface QA {
  q: string;
  a: string;
}

export interface Service {
  id: ServiceId;
  title: string;
  /** Короткое название для бегущей строки и подвала. */
  short: string;
  desc: string;
  includes: readonly [string, string, string, string];
  stack: readonly string[];
  alt: string;
  /** Отдельная страница направления: /{id}/ и /en/{id}/. */
  page: {
    seoTitle: string;
    seoDescription: string;
    lead: string;
    deliverables: readonly [Deliverable, Deliverable, Deliverable, Deliverable, Deliverable, Deliverable];
    faq: readonly [QA, QA, QA];
  };
}

export interface Deliverable {
  title: string;
  text: string;
}

export interface BriefOption {
  /** Стабильный ключ (для предвыбора из ссылки); в письмо уходит `label`. */
  id: string;
  label: string;
}

export interface BriefQuestion {
  /** Имя поля в письме с заявкой. */
  field: string;
  legend: string;
  hint?: string;
  multiple?: boolean;
  options: readonly BriefOption[];
}

export interface Dict {
  locale: Locale;
  /** BCP 47 для атрибута lang и og:locale. */
  lang: string;
  ogLocale: string;
  path: '/' | '/en/';

  meta: {
    title: string;
    description: string;
    ogImageAlt: string;
  };

  a11y: {
    skip: string;
    home: string;
    mainNav: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    sitemap: string;
  };

  nav: readonly NavLink[];

  hero: {
    /** Слово внутри фирменных скобок. */
    mark: string;
    note: string;
    heading: string;
    alt: string;
  };

  about: {
    ghost: string;
    label: string;
    title: Lines;
    lead: string;
    ctaProject: string;
    ctaTelegram: string;
    quote: string;
    quoteCaption: string;
    tiles: readonly { value: string; label: string }[];
  };

  services: {
    label: string;
    title: Lines;
    lead: string;
    cta: string;
    more: string;
    includesLabel: string;
    stackLabel: string;
    items: readonly [Service, Service, Service, Service, Service, Service];
  };

  servicePage: {
    label: string;
    deliverablesTitle: Lines;
    priceTitle: Lines;
    priceText: string;
    priceCta: string;
    faqTitle: Lines;
    faqLead: string;
    otherTitle: Lines;
  };

  process: {
    title: Lines;
    cta: string;
    stage: string;
    outcome: string;
    steps: readonly { title: string; text: string; out: string }[];
  };

  approach: {
    ghost: string;
    title: Lines;
    lead: string;
    tabsLabel: string;
    alt: string;
    items: readonly { tab: string; title: string; text: string }[];
  };

  faq: {
    title: Lines;
    lead: string;
    askTitle: string;
    askCta: string;
    items: readonly QA[];
  };

  contact: {
    label: string;
    title: Lines;
    lead: string;
    rows: readonly { label: string; value: string; href?: string }[];
    /** Пошаговый бриф: четыре вопроса с вариантами, затем контакты. */
    brief: {
      step: string;
      of: string;
      next: string;
      back: string;
      required: string;
      questions: readonly [BriefQuestion, BriefQuestion, BriefQuestion, BriefQuestion];
      contactsLegend: string;
    };
    form: {
      subject: string;
      honeypot: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      consentBefore: string;
      consentLink: string;
      consentAfter: string;
      submit: string;
      sending: string;
      sent: string;
      error: string;
    };
  };

  footer: {
    talk: string;
    company: string;
    requisites: readonly [string, string];
    rights: string;
    privacy: string;
    offer: string;
  };

  notFound: {
    title: string;
    text: string;
    back: string;
  };
}

export type ImageSet = Record<Service['id'] | 'hero' | 'approach', ImageMetadata>;
