import { DateTime } from 'luxon'
import { Item } from '../types/eleventy'

const OPTIONS = { zone: 'utc' }

export interface ItemsByMonth {
   sort: string
   name: string
   items: Item[]
}

type MonthMap = Map<string, ItemsByMonth>

function dateTimeFromItem({ date }: Item): DateTime {
   return typeof date === 'string'
      ? DateTime.fromSQL(date, OPTIONS)
      : DateTime.fromJSDate(date, OPTIONS)
}

function toMonthMap(map: MonthMap, item: Item): MonthMap {
   const itemDateTime = dateTimeFromItem(item)
   const monthSortDate = itemDateTime.toFormat('yyyy.mm')

   const existingMonth = map.get(monthSortDate)
   if (existingMonth) {
      existingMonth.items.push(item)
   } else {
      map.set(monthSortDate, {
         sort: monthSortDate,
         name: itemDateTime.toFormat('MMMM yyyy'),
         items: [item],
      })
   }
   return map
}

export default function itemsByMonth(items: Item[]): ItemsByMonth[] {
   const monthMap = items.reduce(toMonthMap, new Map<string, ItemsByMonth>())
   return [...monthMap.entries()].map(([, itemsByMonth]) => itemsByMonth)
}
