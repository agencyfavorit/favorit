import type { ImageSet } from '@/i18n/types';
import hero from '@/assets/images/hero.jpg';
import web from '@/assets/images/svc-web.jpg';
import mobile from '@/assets/images/svc-mobile.jpg';
import ai from '@/assets/images/svc-ai.jpg';
import backend from '@/assets/images/svc-backend.jpg';
import design from '@/assets/images/svc-design.jpg';
import web3 from '@/assets/images/svc-web3.jpg';
import approach from '@/assets/images/why.jpg';

export const images: ImageSet = { hero, web, mobile, ai, backend, design, web3, approach };

/** Ширины srcset: от телефона до полноширинной ретины; больше исходника Astro не растягивает. */
export const WIDTHS_FULL = [640, 960, 1280, 1600, 1920] as const;
export const WIDTHS_HALF = [480, 640, 800, 960, 1216] as const;

/** AVIF — для современных браузеров, WebP — запасной, JPEG — для старых; качество задано в astro.config. */
export const PICTURE_FORMATS = ['avif', 'webp'] as const;
