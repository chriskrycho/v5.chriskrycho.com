import markdown from './markdown';

const note = (
   content: string,
): string => `<section class='note' aria-label='note' aria-role='note'>

${markdown.render(content)}

</section>`;

export default note;
