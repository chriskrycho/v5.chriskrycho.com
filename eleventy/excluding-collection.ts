import type { Item } from '../types/eleventy.d.ts';

export default function excludingCollection(items: Item[], collection: Item[]): Item[] {
   return items.filter((item) => !collection.includes(item));
}
