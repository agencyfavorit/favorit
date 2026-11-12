import type { APIRoute, GetStaticPaths } from 'astro';
import { ogEntries, type OgEntry } from '@/lib/og-paths';
import { renderOgImage } from '@/lib/og';

/** /og/ru.jpg, /og/en-ai.jpg … — карточки для соцсетей, собираются один раз при сборке. */
export const getStaticPaths = (() =>
  ogEntries().map((entry) => ({ params: { key: entry.key }, props: entry }))) satisfies GetStaticPaths;

export const GET: APIRoute<OgEntry> = async ({ props }) =>
  new Response(new Uint8Array(await renderOgImage(props)), {
    headers: { 'Content-Type': 'image/jpeg' },
  });
