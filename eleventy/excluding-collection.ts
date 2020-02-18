import { Item } from '../types/eleventy'
import toCollection from './to-collection'

export default function excludingCollection(items: Item[], name: string): Item[] {
   return items.filter(item => toCollection(item.inputPath) !== name)
}
