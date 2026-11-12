import { COMPANY, CONTACTS, SITE_URL } from '@/config/site';
import type { Dict, QA } from '@/i18n/types';

/** Разметка конкретной страницы поверх общей «организация + сайт». */
export interface PageSchema {
  faq?: readonly QA[];
  service?: { name: string; description: string; path: string };
  breadcrumbs?: readonly { name: string; path: string }[];
}

const abs = (path: string): string => new URL(path, SITE_URL).href;

/** Структурированные данные schema.org в виде одного @graph. */
export function structuredData(dict: Dict, page: PageSchema = {}): Record<string, unknown> {
  const orgId = `${SITE_URL}/#organization`;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: dict.locale === 'ru' ? 'Фаворит' : 'Favorit',
      legalName: COMPANY.legalName,
      url: abs('/'),
      logo: abs('/icon-512.png'),
      email: CONTACTS.email,
      taxID: COMPANY.inn,
      sameAs: [CONTACTS.telegramUrl],
      address: {
        '@type': 'PostalAddress',
        postalCode: COMPANY.address.postalCode,
        addressLocality: COMPANY.address.locality,
        streetAddress: COMPANY.address.street,
        addressCountry: COMPANY.address.country,
      },
      knowsAbout: dict.services.items.map((s) => s.title),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: abs('/'),
      name: dict.meta.title,
      inLanguage: dict.lang,
      publisher: { '@id': orgId },
    },
  ];

  if (page.service) {
    graph.push({
      '@type': 'Service',
      name: page.service.name,
      description: page.service.description,
      url: abs(page.service.path),
      provider: { '@id': orgId },
      areaServed: 'Worldwide',
      inLanguage: dict.lang,
    });
  }

  if (page.breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: abs(crumb.path),
      })),
    });
  }

  if (page.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      inLanguage: dict.lang,
      mainEntity: page.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
