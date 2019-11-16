import { DateTime } from 'luxon'
import { Item } from '../types/eleventy'

const OPTIONS = { zone: 'utc' }

export interface Year {
   value: string
   itemsByMonth: Month[]
}

export interface Month {
   name: string
   items: Item[]
}

const MONTH_FORMAT = 'MMM'

type MonthMap = Map<number, Month>

function dateTimeFromItem({ date }: Item): DateTime {
   return typeof date === 'string'
      ? DateTime.fromSQL(date, OPTIONS)
      : DateTime.fromJSDate(date, OPTIONS)
}

const enum Order {
   Ascending = 'ASCENDING',
   Descending = 'DESCENDING',
}

type YearMap = Map<number, MonthMap>

function toYearMap(order: Order): (yearMap: YearMap, item: Item) => YearMap {
   return (yearMap, item) => {
      const itemDateTime = dateTimeFromItem(item)
      const { year, month } = itemDateTime

      const existingYear = yearMap.get(year)
      if (existingYear) {
         const existingMonth = existingYear.get(month)
         if (existingMonth) {
            if (order === Order.Ascending) {
               existingMonth.items.push(item)
            } else {
               existingMonth.items = [item, ...existingMonth.items]
            }
         } else {
            existingYear.set(month, {
               name: itemDateTime.toFormat(MONTH_FORMAT),
               items: [item],
            })
         }
      } else {
         const newMonthMap: MonthMap = new Map()
         newMonthMap.set(month, {
            name: itemDateTime.toFormat(MONTH_FORMAT),
            items: [item],
         })
         yearMap.set(year, newMonthMap)
      }
      return yearMap
   }
}

/**
   Given a collection of items, generate a yearly-and-monthly grouping.
   @param items The collection to produce annual groups for
 */
export default function years(items: Item[], order = Order.Descending): Year[] {
   return [...items.reduce(toYearMap(order), new Map<number, MonthMap>()).entries()]
      .sort(([a], [b]) => (order === Order.Ascending ? a - b : b - a))
      .map(([year, monthMap]) => ({
         value: `${year}`,
         itemsByMonth: [...monthMap.entries()]
            .sort(([a], [b]) => (order === Order.Ascending ? a - b : b - a))
            .map(([, month]) => month),
      }))
}
