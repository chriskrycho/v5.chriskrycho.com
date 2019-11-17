import { DateTime } from 'luxon'
import { Item } from '../types/eleventy'

const OPTIONS = { zone: 'America/Denver' }

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

const monthFromItem = (item: Item, dateTime: DateTime): Month => ({
   name: dateTime.toFormat(MONTH_FORMAT),
   items: [item],
})

function toYearMap(order: Order): (yearMap: YearMap, item: Item) => YearMap {
   return (yearMap, item) => {
      const itemDateTime = dateTimeFromItem(item)
      const { year, month } = itemDateTime

      const existingYear = yearMap.get(year)
      if (existingYear) {
         const existingMonth = existingYear.get(month)
         if (existingMonth) {
            if (order === Order.Ascending) {
               existingMonth.items = [item, ...existingMonth.items]
            } else {
               existingMonth.items.push(item)
            }
         } else {
            existingYear.set(month, monthFromItem(item, itemDateTime))
         }
      } else {
         const newMonthMap: MonthMap = new Map()
         newMonthMap.set(month, monthFromItem(item, itemDateTime))
         yearMap.set(year, newMonthMap)
      }
      return yearMap
   }
}

const sortBy = (order: Order) => ([a]: [number, unknown], [b]: [number, unknown]) =>
   order === Order.Ascending ? a - b : b - a

/**
   Given a collection of items, generate a yearly-and-monthly grouping.
   @param items The collection to produce annual groups for
 */
export default function archiveByYears(items: Item[], order = Order.Descending): Year[] {
   let byOrder = sortBy(order)

   return [...items.reduce(toYearMap(order), new Map<number, MonthMap>()).entries()]
      .sort(byOrder)
      .map(([year, monthMap]) => ({
         value: `${year}`,
         itemsByMonth: [...monthMap.entries()].sort(byOrder).map(([, month]) => month),
      }))
}
