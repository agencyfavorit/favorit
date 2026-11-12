/** Единый источник правды для контактов и реквизитов — используется в разметке, JSON-LD и форме. */
export const SITE_URL = 'https://favorit.agency';

export const CONTACTS = {
  email: 'hello@favorit.agency',
  telegramHandle: '@favoritagency',
  telegramUrl: 'https://t.me/favoritagency',
  /** Приёмник заявок FormSubmit: обычный POST (без JS) и JSON-эндпоинт для отправки без перезагрузки. */
  formAction: 'https://formsubmit.co/hello@favorit.agency',
  formEndpoint: 'https://formsubmit.co/ajax/hello@favorit.agency',
} as const;

export const COMPANY = {
  legalName: 'ООО «Фаворит»',
  inn: '7743578436',
  kpp: '772501001',
  address: {
    postalCode: '115487',
    locality: 'Москва',
    street: 'проспект Андропова, д. 38, помещение III, комната 1–24',
    country: 'RU',
  },
} as const;
