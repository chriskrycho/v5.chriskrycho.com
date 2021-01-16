import { Item } from '../types/eleventy';

export default function excludingCollection(items: Item[], collection: Item[]): Item[] {
   return items.filter((item) => !collection.includes(item));
}
