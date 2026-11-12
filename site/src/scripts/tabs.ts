/**
 * Вкладки по паттерну WAI-ARIA (автоматическая активация):
 * клик, наведение мышью, стрелки, Home/End. Без JS все панели видны списком.
 */
export function initTabs(root: HTMLElement): void {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls') ?? ''));
  if (!tabs.length || panels.some((p) => !p)) return;

  root.classList.add('is-enhanced');
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

  const select = (index: number, focus = false): void => {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[i]!.hidden = !active;
    });
    if (focus) tabs[index]!.focus();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('pointerenter', () => {
      if (canHover.matches) select(i);
    });
    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      const next =
        event.key === 'ArrowDown' || event.key === 'ArrowRight'
          ? (i + 1) % tabs.length
          : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
            ? (i - 1 + tabs.length) % tabs.length
            : event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? last
                : -1;
      if (next < 0) return;
      event.preventDefault();
      select(next, true);
    });
  });

  select(0);
}
