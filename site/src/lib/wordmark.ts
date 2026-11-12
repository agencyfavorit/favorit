/**
 * Геометрия фирменной надписи «[СЛОВО]».
 *
 * Надпись рисуется в SVG с фиксированным viewBox, поэтому она всегда ровно
 * в ширину контейнера, не требует JavaScript и не сдвигает вёрстку, пока грузится
 * шрифт (`textLength` дотягивает интервалы до заданной ширины на любом шрифте).
 *
 * Ширины — advance-метрики Wix Madefor Display ExtraBold (800) в долях em,
 * измерены в браузере. Для слов, что уже есть на сайте, хранится точная
 * ширина с кернингом; для остальных — сумма ширин глифов.
 */

const GLYPH: Readonly<Record<string, number>> = {
  А: 0.799, Б: 0.688, В: 0.698, Г: 0.587, Д: 0.851, Е: 0.647, Ё: 0.647, Ж: 1.14, З: 0.672, И: 0.804, Й: 0.804,
  К: 0.789, Л: 0.795, М: 0.966, Н: 0.796, О: 0.872, П: 0.794, Р: 0.684, С: 0.761, Т: 0.662, У: 0.703, Ф: 0.916,
  Х: 0.758, Ц: 0.834, Ч: 0.725, Ш: 1.14, Щ: 1.188, Ъ: 0.785, Ы: 0.979, Ь: 0.693, Э: 0.755, Ю: 1.126, Я: 0.726,
  A: 0.799, B: 0.68, C: 0.761, D: 0.764, E: 0.629, F: 0.601, G: 0.819, H: 0.76, I: 0.296, J: 0.696, K: 0.771,
  L: 0.584, M: 0.928, N: 0.77, O: 0.872, P: 0.666, Q: 0.872, R: 0.722, S: 0.711, T: 0.662, U: 0.752, V: 0.789,
  W: 1.084, X: 0.758, Y: 0.752, Z: 0.666,
  '0': 0.66, '1': 0.506, '2': 0.598, '3': 0.637, '4': 0.681, '5': 0.627, '6': 0.645, '7': 0.608, '8': 0.656, '9': 0.645,
  ' ': 0.195, '.': 0.288, ',': 0.288, '-': 0.338, '&': 0.725,
};

const KERNED: Readonly<Record<string, number>> = {
  ФАВОРИТ: 5.355,
  'О НАС': 3.363,
  ПОДХОД: 4.808,
  FAVORIT: 4.441,
  ABOUT: 3.745,
  APPROACH: 5.865,
};

/** Единицы viewBox при кегле 100. */
const UNITS = 100;
const CAP_HEIGHT = 71.5;
/** Насколько скобка выходит за линию прописных и базовую линию. */
const OVERHANG = 14;
const BRACKET_ARM = 25;
const BRACKET_STROKE = 11.8;
const GAP = 2;

export interface WordmarkGeometry {
  text: string;
  width: number;
  height: number;
  baseline: number;
  textX: number;
  textLength: number;
  left: string;
  right: string;
}

const bracket = (x: number, h: number, dir: 1 | -1): string => {
  const arm = BRACKET_ARM * dir;
  const t = BRACKET_STROKE * dir;
  const pts = [
    [x, 0],
    [x + arm, 0],
    [x + arm, BRACKET_STROKE],
    [x + t, BRACKET_STROKE],
    [x + t, h - BRACKET_STROKE],
    [x + arm, h - BRACKET_STROKE],
    [x + arm, h],
    [x, h],
  ];
  return pts.map(([px, py]) => `${round(px!)},${round(py!)}`).join(' ');
};

const round = (n: number): number => Math.round(n * 100) / 100;

export function wordmark(word: string, locale: string): WordmarkGeometry {
  const text = word.toLocaleUpperCase(locale);
  const em = KERNED[text] ?? [...text].reduce((sum, ch) => sum + (GLYPH[ch] ?? 0.75), 0);
  const textLength = round(em * UNITS);
  const height = CAP_HEIGHT + OVERHANG * 2;
  const width = round(BRACKET_ARM * 2 + GAP * 2 + textLength);

  return {
    text,
    width,
    height,
    baseline: OVERHANG + CAP_HEIGHT,
    textX: BRACKET_ARM + GAP,
    textLength,
    left: bracket(0, height, 1),
    right: bracket(width, height, -1),
  };
}
