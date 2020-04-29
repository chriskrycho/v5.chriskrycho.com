import { DateTime } from 'luxon'
import { Item } from '../types/eleventy'
import { fromDateOrString, canParseDate } from './date-time'

export interface Year {
   name: string
   months: Month[]
}

export interface Month {
   name: string
   days: Day[]
}

export interface Day {
   name: string
   items: Item[]
}

type Archive = Year[]

const enum Order {
   OldFirst = 'OLD_FIRST',
   NewFirst = 'NEW_FIRST',
}

const YEAR_FORMAT = 'yyyy'
const MONTH_FORMAT = 'MMM'
const DAY_FORMAT = 'dd'

export const TZ_OPTIONS: Intl.DateTimeFormatOptions = { timeZoneName: 'America/Denver' }

type DayMap = Map<number, Item[]>
type MonthMap = Map<number, [string, DayMap]>
type YearMap = Map<number, [string, MonthMap]>

const byDate = (order: Order) => (a: Item, b: Item): number => {
   if (canParseDate(a.date) && canParseDate(b.date)) {
      const aDate = fromDateOrString(a.date).toSeconds()
      const bDate = fromDateOrString(b.date).toSeconds()
      return order === Order.OldFirst ? aDate - bDate : bDate - aDate
   } else {
      return 0
   }
}

const dateTimeFromItem = ({ date }: Item): DateTime => fromDateOrString(date)

const daysFromDayMap = (dayMap: DayMap, byEntries: SortByEntries, order: Order): Day[] =>
   [...dayMap.entries()].sort(byEntries).map(([, items]) => ({
      name: dateTimeFromItem(items[0]).toFormat(DAY_FORMAT, TZ_OPTIONS),
      items: items.slice().sort(byDate(order)),
   }))

const monthsFromMonthMap = (
   monthMap: MonthMap,
   byEntries: SortByEntries,
   order: Order,
): Month[] =>
   [...monthMap.entries()].sort(byEntries).map(([, [name, dayMap]]) => ({
      name,
      days: daysFromDayMap(dayMap, byEntries, order),
   }))

const dayMapFromItem = (item: Item, dateTime: DateTime): DayMap =>
   new Map([[dateTime.day, [item]]])

const monthMapFromItem = (item: Item, dateTime: DateTime): MonthMap =>
   new Map([
      [
         dateTime.month,
         [dateTime.toFormat(MONTH_FORMAT, TZ_OPTIONS), dayMapFromItem(item, dateTime)],
      ],
   ])

function toYearMap(yearMap: YearMap, item: Item): YearMap {
   const itemDateTime = dateTimeFromItem(item)
   const { year, month, day } = itemDateTime

   const existingMonthMap = yearMap.get(year)
   if (existingMonthMap) {
      const existingDayMap = existingMonthMap[1].get(month)
      if (existingDayMap) {
         const existingDay = existingDayMap[1].get(day)
         if (existingDay) {
            existingDay.push(item)
         } else {
            existingDayMap[1].set(day, [item])
         }
      } else {
         existingMonthMap[1].set(month, [
            itemDateTime.toFormat(MONTH_FORMAT, TZ_OPTIONS),
            dayMapFromItem(item, itemDateTime),
         ])
      }
   } else {
      yearMap.set(year, [
         itemDateTime.toFormat(YEAR_FORMAT, TZ_OPTIONS),
         monthMapFromItem(item, itemDateTime),
      ])
   }
   return yearMap
}

type SortByEntries = ([a]: [number, unknown], [b]: [number, unknown]) => number

const sortBy = (order: Order): SortByEntries => ([a], [b]): number =>
   order === Order.OldFirst ? a - b : b - a

const intoYear = (byEntries: SortByEntries, order: Order) => ([, [name, monthMap]]: [
   number,
   [string, MonthMap],
]): Year => ({
   name,
   months: monthsFromMonthMap(monthMap, byEntries, order),
})

/**
   Given a collection of items, generate a yearly-and-monthly-and-daily grouping.

   @param items The collection to produce an archive for
 */
export default function archiveByYear(items: Item[], order = Order.NewFirst): Archive {
   const byOrder = sortBy(order)

   return [...items.reduce(toYearMap, new Map()).entries()]
      .sort(byOrder)
      .map(intoYear(byOrder, order))
}
