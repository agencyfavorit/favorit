/**
 * Карточки для соцсетей (1200×630): фирменная надпись [ФАВОРИТ] над фотографией —
 * как первый экран сайта. Рендер при сборке: Satori (разметка → SVG с контурами букв)
 * и sharp (SVG → JPEG). Никаких внешних сервисов и шрифтов системы.
 */
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { getDict } from '@/i18n';
import type { OgEntry } from './og-paths';
import { wordmark } from './wordmark';

const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 48;
const INK = '#111111';

const require = createRequire(import.meta.url);

const fontFile = (pkg: string, file: string) => readFile(require.resolve(`${pkg}/files/${file}`));

/** Шрифты грузим один раз на всю сборку. */
const DISPLAY = 'DisplayLatin, DisplayCyrillic';
const TEXT = 'TextLatin, TextCyrillic';
let fontsPromise: ReturnType<typeof loadFonts> | undefined;
async function loadFonts() {
  const display = '@fontsource/wix-madefor-display';
  const text = '@fontsource/wix-madefor-text';
  const [dc, dl, tc, tl] = await Promise.all([
    fontFile(display, 'wix-madefor-display-cyrillic-800-normal.woff2'),
    fontFile(display, 'wix-madefor-display-latin-800-normal.woff2'),
    fontFile(text, 'wix-madefor-text-cyrillic-500-normal.woff2'),
    fontFile(text, 'wix-madefor-text-latin-500-normal.woff2'),
  ]);
  // У каждого подмножества своё имя: Satori не ищет глиф в другом файле того же семейства,
  // поэтому латиницу и кириллицу перечисляем в fontFamily как цепочку запасных.
  return [
    { name: 'DisplayLatin', data: dl, weight: 800 as const, style: 'normal' as const },
    { name: 'DisplayCyrillic', data: dc, weight: 800 as const, style: 'normal' as const },
    { name: 'TextLatin', data: tl, weight: 500 as const, style: 'normal' as const },
    { name: 'TextCyrillic', data: tc, weight: 500 as const, style: 'normal' as const },
  ];
}

/** Исходники фото лежат в src/assets/images; сборка всегда запускается из корня проекта. */
const photoFile = (entry: OgEntry): string =>
  path.join(process.cwd(), 'src/assets/images', entry.service ? `svc-${entry.service}.jpg` : 'hero.jpg');

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

export async function renderOgImage(entry: OgEntry): Promise<Buffer> {
  const dict = getDict(entry.locale);
  const service = entry.service ? dict.services.items.find((s) => s.id === entry.service) : undefined;
  const caption = service ? service.title : dict.about.label;

  // Надпись в скобках: та же геометрия, что у SVG на сайте, масштабированная на ширину карточки.
  const g = wordmark(dict.hero.mark, dict.locale);
  const scale = (WIDTH - PAD * 2) / g.width;
  const markHeight = g.height * scale;
  const stroke = 11.8 * scale;
  const arm = 25 * scale;
  const bracket = (side: 'left' | 'right') =>
    h('div', {
      width: arm,
      height: markHeight,
      borderTop: `${stroke}px solid ${INK}`,
      borderBottom: `${stroke}px solid ${INK}`,
      [side === 'left' ? 'borderLeft' : 'borderRight']: `${stroke}px solid ${INK}`,
    });

  const top = PAD - 8;
  const markBlock = top + markHeight + 30;
  const photoHeight = HEIGHT - markBlock;

  const photo = await sharp(await readFile(photoFile(entry)))
    .resize(WIDTH, Math.round(photoHeight), { fit: 'cover', position: entry.service ? 'centre' : 'attention' })
    .jpeg({ quality: 82 })
    .toBuffer();

  const tree = h(
    'div',
    { width: WIDTH, height: HEIGHT, display: 'flex', flexDirection: 'column', background: '#ffffff' },
    [
      h(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: markHeight,
          margin: `${top}px ${PAD}px 30px`,
          color: INK,
        },
        [
          bracket('left'),
          h(
            'div',
            {
              display: 'flex',
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: 100 * scale,
              lineHeight: 1,
              letterSpacing: -0.012 * 100 * scale,
              marginTop: 2 * scale,
            },
            g.text,
          ),
          bracket('right'),
        ],
      ),
      h('div', { display: 'flex', position: 'relative', width: WIDTH, height: photoHeight }, [
        h('img', { width: WIDTH, height: photoHeight, objectFit: 'cover' }, undefined, {
          src: `data:image/jpeg;base64,${photo.toString('base64')}`,
          width: WIDTH,
          height: Math.round(photoHeight),
        }),
        h('div', {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: photoHeight * 0.6,
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.55))',
        }),
        h(
          'div',
          {
            position: 'absolute',
            left: PAD,
            right: PAD,
            bottom: 36,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#ffffff',
          },
          [
            h(
              'div',
              {
                display: 'flex',
                maxWidth: 820,
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 46,
                lineHeight: 1,
                textTransform: 'uppercase',
              },
              caption,
            ),
            h('div', { display: 'flex', fontFamily: TEXT, fontWeight: 500, fontSize: 24 }, 'favorit.agency'),
          ],
        ),
      ]),
    ],
  );

  fontsPromise ??= loadFonts();
  const svg = await satori(tree as Parameters<typeof satori>[0], { width: WIDTH, height: HEIGHT, fonts: await fontsPromise });
  return sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
}
