import { DateTime } from 'luxon'
import { Item } from '../types/eleventy'

const OPTIONS = { zone: 'utc' }

export interface Year {
   value: string
   itemsByMonth: Month[]
}

export interface Month {
   longName: string
   shortName: string
   items: Item[]
}

const MONTH_FORMAT = {
   SHORT: 'MMM',
   LONG: 'MMMM',
}

type MonthMap = Map<number, Month>

function dateTimeFromItem({ date }: Item): DateTime {
   return typeof date === 'string'
      ? DateTime.fromSQL(date, OPTIONS)
      : DateTime.fromJSDate(date, OPTIONS)
}

type YearMap = Map<number, MonthMap>

function toYearMap(yearMap: YearMap, item: Item): YearMap {
   const itemDateTime = dateTimeFromItem(item)
   const { year, month } = itemDateTime

   const existingYear = yearMap.get(year)
   if (existingYear) {
      const existingMonth = existingYear.get(month)
      if (existingMonth) {
         existingMonth.items.push(item)
      } else {
         existingYear.set(month, {
            longName: itemDateTime.toFormat(MONTH_FORMAT.LONG),
            shortName: itemDateTime.toFormat(MONTH_FORMAT.SHORT),
            items: [item],
         })
      }
   } else {
      const newMonthMap: MonthMap = new Map()
      newMonthMap.set(month, {
         longName: itemDateTime.toFormat(MONTH_FORMAT.LONG),
         shortName: itemDateTime.toFormat(MONTH_FORMAT.SHORT),
         items: [item],
      })
      yearMap.set(year, newMonthMap)
   }
   return yearMap
}

/**
   Given a collection of items, generate a yearly-and-monthly grouping.
   @param items The collection to produce annual groups for
 */
export default function years(items: Item[]): Year[] {
   return [...items.reduce(toYearMap, new Map<number, MonthMap>()).entries()]
      .sort(([yearA], [yearB]) => yearA - yearB)
      .map(([year, monthMap]) => ({
         value: `${year}`,
         itemsByMonth: [...monthMap.entries()].map(([, month]) => month),
      }))
}
