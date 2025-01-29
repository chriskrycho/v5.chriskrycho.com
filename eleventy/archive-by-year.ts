import { DateTime } from 'luxon';
import type { Item } from '../types/eleventy.ts';
import { fromDateOrString, canParseDate } from './date-time.ts';

type Archive = Year[];

export interface Year {
   name: string;
   months: Month[];
}

export interface Month {
   name: string;
   days: Day[];
}

export interface Day {
   name: string;
   items: Item[];
}

export const Order = {
   OldFirst: 'OLD_FIRST',
   NewFirst: 'NEW_FIRST',
} as const;

export type Order = (typeof Order)[keyof typeof Order];

const YEAR_FORMAT = 'yyyy';
const MONTH_FORMAT = 'MMM';
const DAY_FORMAT = 'dd';

type DayMap = Map<number, Item[]>;
type MonthMap = Map<number, [string, DayMap]>;
type YearMap = Map<number, [string, MonthMap]>;

export const byDate =
   (order: Order) =>
   (a: Item, b: Item): number => {
      // Sort order is meaningless if either doesn't have the relevant comparison key.
      if (!canParseDate(a.date) || !canParseDate(b.date)) {
         return 0;
      }

      const aDate = fromDateOrString(a.date).toSeconds();
      const bDate = fromDateOrString(b.date).toSeconds();
      return order === Order.OldFirst ? aDate - bDate : bDate - aDate;
   };

export const byUpdated =
   (order: Order) =>
   (a: Item, b: Item): number => {
      // Sort order is meaningless if either doesn't have the relevant comparison key.
      if (!a.data || !b.data) {
         return 0;
      }

      // Likewise if the value isn't parseable for either.
      if (!canParseDate(a.data.updated) || !canParseDate(b.data.updated)) {
         return 0;
      }

      const aUpdated = fromDateOrString(a.data.updated).toSeconds();
      const bUpdated = fromDateOrString(b.data.updated).toSeconds();
      return order === Order.OldFirst ? aUpdated - bUpdated : bUpdated - aUpdated;
   };

const dateTimeFromItem = ({ date }: Item): DateTime => fromDateOrString(date);

const daysFromDayMap = (
   dayMap: DayMap,
   byEntries: SortedByEntries,
   order: Order,
): Day[] =>
   [...dayMap.entries()].sort(byEntries).map(([, items]) => ({
      name: dateTimeFromItem(items[0]).toFormat(DAY_FORMAT),
      items: items.slice().sort(byDate(order)),
   }));

const monthsFromMonthMap = (
   monthMap: MonthMap,
   byEntries: SortedByEntries,
   order: Order,
): Month[] =>
   [...monthMap.entries()].sort(byEntries).map(([, [name, dayMap]]) => ({
      name,
      days: daysFromDayMap(dayMap, byEntries, order),
   }));

const dayMapFromItem = (item: Item, dateTime: DateTime): DayMap =>
   new Map([[dateTime.day, [item]]]);

const monthMapFromItem = (item: Item, dateTime: DateTime): MonthMap =>
   new Map([
      [dateTime.month, [dateTime.toFormat(MONTH_FORMAT), dayMapFromItem(item, dateTime)]],
   ]);

function toYearMap(yearMap: YearMap, item: Item): YearMap {
   const itemDateTime = dateTimeFromItem(item);
   const { year, month, day } = itemDateTime;

   const existingMonthMap = yearMap.get(year);
   if (existingMonthMap) {
      const existingDayMap = existingMonthMap[1].get(month);
      if (existingDayMap) {
         const existingDay = existingDayMap[1].get(day);
         if (existingDay) {
            existingDay.push(item);
         } else {
            existingDayMap[1].set(day, [item]);
         }
      } else {
         existingMonthMap[1].set(month, [
            itemDateTime.toFormat(MONTH_FORMAT),
            dayMapFromItem(item, itemDateTime),
         ]);
      }
   } else {
      yearMap.set(year, [
         itemDateTime.toFormat(YEAR_FORMAT),
         monthMapFromItem(item, itemDateTime),
      ]);
   }
   return yearMap;
}

type SortedByEntries = ([a]: [number, unknown], [b]: [number, unknown]) => number;
const sortedByEntries =
   (order: Order): SortedByEntries =>
   ([a], [b]): number =>
      order === Order.OldFirst ? a - b : b - a;

const intoYear =
   (byEntries: SortedByEntries, order: Order) =>
   ([, [name, monthMap]]: [number, [string, MonthMap]]): Year => ({
      name,
      months: monthsFromMonthMap(monthMap, byEntries, order),
   });

/**
   Given a collection of items, generate a yearly-and-monthly-and-daily grouping.

   @param items The collection to produce an archive for
 */
export default function archiveByYear(items: Item[], order = Order.NewFirst): Archive {
   const byOrder = sortedByEntries(order);

   return [...items.reduce(toYearMap, new Map()).entries()]
      .sort(byOrder)
      .map(intoYear(byOrder, order));
}
