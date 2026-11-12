/**
 * Пошаговый бриф поверх обычной формы.
 * Без JS все вопросы видны сразу и форма уходит обычным POST;
 * с JS — по одному шагу, с проверкой выбора, управлением фокусом и предвыбором услуги.
 */
export interface BriefController {
  reset(): void;
}

export function initBrief(form: HTMLFormElement): BriefController | null {
  const steps = [...form.querySelectorAll<HTMLFieldSetElement>('[data-brief-step]')];
  const back = form.querySelector<HTMLButtonElement>('[data-brief-back]');
  const next = form.querySelector<HTMLButtonElement>('[data-brief-next]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const progress = form.querySelector<HTMLElement>('[data-brief-progress]');
  if (!steps.length || !back || !next || !submit || !progress) return null;

  const last = steps.length - 1;
  const label = (i: number): string =>
    `${form.dataset['stepLabel'] ?? ''} ${i + 1} ${form.dataset['ofLabel'] ?? ''} ${steps.length}`.trim();
  let current = 0;
  let pointerChoice = false;

  form.classList.add('is-stepped');

  const errorOf = (step: HTMLFieldSetElement) => step.querySelector<HTMLElement>('[data-brief-error]');

  const show = (index: number, { focus = true } = {}): void => {
    current = Math.max(0, Math.min(last, index));
    steps.forEach((step, i) => (step.hidden = i !== current));
    back.hidden = current === 0;
    next.hidden = current === last;
    submit.hidden = current !== last;
    form.classList.toggle('is-last', current === last);
    progress.textContent = label(current);
    form.style.setProperty('--brief-progress', String((current + 1) / steps.length));
    if (!focus) return;
    if (form.getBoundingClientRect().top < 0) form.scrollIntoView({ block: 'start' });
    steps[current]!.querySelector<HTMLElement>('legend')?.focus({ preventScroll: true });
  };

  /** Шаг с вариантами валиден, если что-то выбрано; шаг с полями — по правилам самих полей. */
  const validate = (index: number): boolean => {
    const step = steps[index]!;
    const choices = [...step.querySelectorAll<HTMLInputElement>('input[type="radio"], input[type="checkbox"]')];
    if (choices.length) {
      const ok = choices.some((input) => input.checked);
      const error = errorOf(step);
      if (error) error.hidden = ok;
      if (!ok) choices[0]!.focus();
      return ok;
    }
    const fields = [...step.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')];
    const invalid = fields.find((field) => !field.checkValidity());
    invalid?.reportValidity();
    return !invalid;
  };

  const goNext = (): void => {
    if (validate(current)) show(current + 1);
  };

  next.addEventListener('click', goNext);
  back.addEventListener('click', () => show(current - 1));

  // Enter на шаге с вариантами — «дальше», а не отправка всей формы.
  form.addEventListener(
    'submit',
    (event) => {
      if (current < last) {
        event.preventDefault();
        event.stopImmediatePropagation();
        goNext();
      }
    },
    { capture: true },
  );

  // Выбор мышью или пальцем в вопросе с одним ответом сразу ведёт дальше; клавиатурой — нет.
  form.addEventListener('pointerdown', (event) => {
    pointerChoice = event.target instanceof Element && Boolean(event.target.closest('.opt'));
  });
  form.addEventListener('change', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const byPointer = pointerChoice;
    pointerChoice = false;
    const step = input.closest<HTMLFieldSetElement>('[data-brief-step]');
    if (step) {
      const error = errorOf(step);
      if (error) error.hidden = true;
    }
    if (input.type === 'radio' && byPointer && current < last) {
      window.setTimeout(() => show(current + 1), 220);
    }
  });

  // Предвыбор услуги: кнопки «Обсудить проект» в карточках и ссылка ?service=web со страниц услуг.
  const preselect = (id: string): void => {
    const box = form.querySelector<HTMLInputElement>(`input[type="checkbox"][data-id="${CSS.escape(id)}"]`);
    if (!box) return;
    box.checked = true;
    show(0, { focus: false });
  };
  document.addEventListener('click', (event) => {
    const trigger = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-brief-service]') : null;
    const id = trigger?.dataset['briefService'];
    if (id) preselect(id);
  });
  const fromUrl = new URLSearchParams(window.location.search).get('service');
  if (fromUrl) preselect(fromUrl);

  show(0, { focus: false });

  return {
    reset: () => {
      steps.forEach((step) => {
        const error = errorOf(step);
        if (error) error.hidden = true;
      });
      show(0, { focus: false });
    },
  };
}
