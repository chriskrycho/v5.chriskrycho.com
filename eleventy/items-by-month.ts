import { DateTime } from 'luxon'
import { Item } from '../types/eleventy'

const OPTIONS = { zone: 'utc' }

export interface ItemsByMonth {
   month: {
      sort: string
      name: string
   }
   items: Item[]
}

function dateTimeFromItem({ date }: Item): DateTime {
   return typeof date === 'string'
      ? DateTime.fromSQL(date, OPTIONS)
      : DateTime.fromJSDate(date, OPTIONS)
}

function toMonthMap(
   map: Map<string, ItemsByMonth>,
   item: Item,
): Map<string, ItemsByMonth> {
   const itemDateTime = dateTimeFromItem(item)
   const monthSortDate = itemDateTime.toFormat('YYYY.MM')

   const existingMonth = map.get(monthSortDate)
   if (existingMonth) {
      existingMonth.items.push(item)
   } else {
      map.set(monthSortDate, {
         month: {
            sort: monthSortDate,
            name: itemDateTime.toFormat(''),
         },
         items: [item],
      })
   }
   return map
}

export default function itemsByMonth(items: Item[]): ItemsByMonth[] {
   const monthMap = items.reduce(toMonthMap, new Map<string, ItemsByMonth>())
   return [...monthMap.entries()].map(([, itemsByMonth]) => itemsByMonth)
}
