/**
 * Шапка: прячется при прокрутке вниз и возвращается при прокрутке вверх;
 * мобильное меню с управлением фокусом (остальная страница — inert, Esc закрывает).
 */
export function initHeader(): void {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const burger = document.querySelector<HTMLButtonElement>('[data-burger]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!nav || !burger || !menu) return;

  const backdrop = [...document.querySelectorAll<HTMLElement>('main, footer')];
  const labelOpen = burger.dataset['labelOpen'] ?? '';
  const labelClose = burger.dataset['labelClose'] ?? '';
  let open = false;
  let lastY = window.scrollY;
  let frame = 0;

  window.addEventListener(
    'scroll',
    () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (!open) nav.classList.toggle('is-hidden', y > lastY && y > 160);
        lastY = y;
      });
    },
    { passive: true },
  );

  // Клавиатурная навигация не должна попадать в спрятанную шапку.
  nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'));

  const setOpen = (next: boolean, restoreFocus = true): void => {
    open = next;
    menu.classList.toggle('is-open', next);
    menu.inert = !next;
    nav.classList.toggle('is-dark', next);
    nav.classList.remove('is-hidden');
    burger.setAttribute('aria-expanded', String(next));
    burger.setAttribute('aria-label', next ? labelClose : labelOpen);
    document.documentElement.classList.toggle('is-locked', next);
    backdrop.forEach((el) => (el.inert = next));
    if (next) menu.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    else if (restoreFocus) burger.focus({ preventScroll: true });
  };

  burger.addEventListener('click', () => setOpen(!open));
  menu.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) setOpen(false, false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) setOpen(false);
  });
  window.matchMedia('(min-width: 1041px)').addEventListener('change', (event) => {
    if (event.matches && open) setOpen(false, false);
  });
}
