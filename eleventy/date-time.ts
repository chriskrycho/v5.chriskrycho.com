import { DateTime, type DateTimeOptions } from 'luxon';

type Parse = (text: string, options?: DateTimeOptions | undefined) => DateTime;

const maybeDateTime = (parse: Parse, input: string): DateTime | null => {
   const parsed = parse(input);
   return parsed.isValid ? parsed : null;
};

export const TZ = { zone: 'America/Denver' };

// Same parsing rules as 11ty itself uses: ISO or SQL, nothing else.
export const toDateTime = (input: string): DateTime => {
   const dateTime =
      maybeDateTime((s) => DateTime.fromISO(s, TZ), input) ??
      maybeDateTime((s) => DateTime.fromSQL(s, TZ), input);
   if (!dateTime) throw new Error(`Could not parse date: ${input}`);
   return dateTime;
};

export const canParseDate = (date: unknown): date is string | Date =>
   typeof date === 'string' || date instanceof Date;

/**
   Constructing a zoned `DateTime` costs an `Intl.DateTimeFormat.formatToParts`
   call to resolve the offset, and the sort comparators in `archive-by-year.ts`
   re-derive both of their operands on every comparison — so the same handful of
   dates gets parsed O(n log n) times per collection, across ~40 collections.
   `DateTime` is immutable, so the results are safe to share.

   Keyed on the source value; the numeric branch is negated so that a `Date`
   whose epoch milliseconds happen to stringify like an ISO date cannot collide
   with a string key.
 */
const parsed = new Map<string | number, DateTime>();

export const fromDateOrString = (date: Date | string): DateTime => {
   const key = typeof date === 'string' ? date : -date.getTime();

   const cached = parsed.get(key);
   if (cached) return cached;

   const dateTime =
      typeof date === 'string' ? toDateTime(date) : DateTime.fromJSDate(date, TZ);

   parsed.set(key, dateTime);
   return dateTime;
};

export default toDateTime;
