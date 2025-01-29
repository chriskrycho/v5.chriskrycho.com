import type { Page, Item } from '../types/eleventy.ts';

export const currentPage = (allItems: Item[], page: Page): Item | undefined =>
   allItems.find((item) => item.url === page.url);

export default currentPage;
