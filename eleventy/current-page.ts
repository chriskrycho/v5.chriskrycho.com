import { Page, Item } from '../types/eleventy'

export const currentPage = (allItems: Item[], page: Page): Item | undefined =>
   allItems.filter((item) => item.url === page.url)[0]

export default currentPage
