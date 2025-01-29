import type { Item } from '../types/eleventy.ts';

export default function excludingCollection(items: Item[], collection: Item[]): Item[] {
   return items.filter((item) => !collection.includes(item));
}
