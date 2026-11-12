/**
 * Отправка заявки в FormSubmit (JSON, без перезагрузки).
 * Без JS форма уходит обычным POST — прогрессивное улучшение.
 */
type Status = 'idle' | 'sending' | 'sent' | 'error';

interface Options {
  /** Вызывается после успешной отправки — например, чтобы вернуть бриф на первый шаг. */
  onSent?: () => void;
}

/** Поля с несколькими значениями (галочки) склеиваем в одну строку — так их удобно читать в письме. */
const toPayload = (form: HTMLFormElement): Record<string, string> => {
  const data = new FormData(form);
  const payload: Record<string, string> = {};
  for (const key of new Set(data.keys())) {
    payload[key] = data
      .getAll(key)
      .map((value) => String(value).trim())
      .filter(Boolean)
      .join(', ');
  }
  return payload;
};

export function initContactForm(form: HTMLFormElement, { onSent }: Options = {}): void {
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const label = button?.querySelector<HTMLElement>('.btn__label');
  const live = form.querySelector<HTMLElement>('[data-form-status]');
  if (!button || !label || !live) return;

  const text: Record<Status, string> = {
    idle: label.textContent?.trim() ?? '',
    sending: form.dataset['sending'] ?? '',
    sent: form.dataset['sent'] ?? '',
    error: form.dataset['error'] ?? '',
  };
  let reset = 0;

  const setStatus = (status: Status): void => {
    window.clearTimeout(reset);
    label.textContent = text[status];
    button.disabled = status === 'sending';
    button.classList.toggle('is-ok', status === 'sent');
    button.classList.toggle('is-error', status === 'error');
    form.setAttribute('aria-busy', String(status === 'sending'));
    live.textContent = status === 'idle' || status === 'sending' ? '' : text[status];
    if (status === 'sent' || status === 'error') reset = window.setTimeout(() => setStatus('idle'), 5000);
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch(form.dataset['endpoint'] ?? form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(toPayload(form)),
      });
      if (!response.ok) throw new Error(`FormSubmit responded ${response.status}`);
      form.reset();
      onSent?.();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  });
}
