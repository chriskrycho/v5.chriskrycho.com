/** Replaces wide spaces with hair spaces. */
export default function spaces(text: string): string {
   return text.replace(/ × /g, ' × ').replace(/ \/ /g, ' / ');
}
