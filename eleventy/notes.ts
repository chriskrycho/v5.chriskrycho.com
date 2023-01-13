import markdown from './markdown';

export const note = (content: string): string =>
   `<section class='note' aria-label='note' aria-role='note'>${markdown.render(
      content,
   )}</section>`;

export const callout = (content: string): string =>
   `<section class='callout' aria-role='note'>${markdown.render(content)}</section>`;
