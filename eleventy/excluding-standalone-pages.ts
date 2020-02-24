import { Item } from '../types/eleventy'
import './feed'

export default function excludingStandalonePages(items: Item[]): Item[] {
   return items.filter(item => {
      const isStandalone = item.data?.standalonePage ?? false
      return !isStandalone
   })
}
