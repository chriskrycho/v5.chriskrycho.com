import markdown from './markdown';

export const note = (content: string, { type = 'Note' } = {}): string =>
   `<section class='note' aria-label='${type}' aria-role='note'>${markdown.render(
      content,
   )}</section>`;

export const callout = (content: string): string =>
   `<section class='callout' aria-role='note'>${markdown.render(content)}</section>`;
