import { DateTime } from 'luxon'
import { Item } from '../types/eleventy'
import { fromDateOrString, canParseDate } from './date-time'

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
   return typeof date === 'string' ? DateTime.fromSQL(date) : DateTime.fromJSDate(date)
}

const enum Order {
   OldFirst = 'OLD_FIRST',
   NewFirst = 'NEW_FIRST',
}

type YearMap = Map<number, MonthMap>

const monthFromItem = (item: Item, dateTime: DateTime): Month => ({
   name: dateTime.toFormat(MONTH_FORMAT),
   items: [item],
})

function toYearMap(yearMap: YearMap, item: Item): YearMap {
   const itemDateTime = dateTimeFromItem(item)
   const { year, month } = itemDateTime

   const existingYear = yearMap.get(year)
   if (existingYear) {
      const existingMonth = existingYear.get(month)
      if (existingMonth) {
         existingMonth.items.push(item)
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

const sortBy = (order: Order) => (
   [a]: [number, unknown],
   [b]: [number, unknown],
): number => (order === Order.OldFirst ? a - b : b - a)

/**
   Given a collection of items, generate a yearly-and-monthly grouping.
   @param items The collection to produce annual groups for
 */
export default function archiveByYears(items: Item[], order = Order.NewFirst): Year[] {
   const byOrder = sortBy(order)

   return [...items.reduce(toYearMap, new Map<number, MonthMap>()).entries()]
      .sort(byOrder)
      .map(([year, monthMap]) => ({
         value: `${year}`,
         itemsByMonth: [...monthMap.entries()]
            .sort(byOrder)
            .map(([, month]) => month)
            .map(month => {
               month.items = month.items.slice().sort((a, b) => {
                  if (canParseDate(a.data.date) && canParseDate(b.data.date)) {
                     const aDate = fromDateOrString(a.data.date).toSeconds()
                     const bDate = fromDateOrString(b.data.date).toSeconds()
                     return order === Order.OldFirst ? aDate - bDate : bDate - aDate
                  } else {
                     return 0
                  }
               })

               return month
            }),
      }))
}
