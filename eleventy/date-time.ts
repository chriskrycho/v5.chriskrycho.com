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

export const fromDateOrString = (date: Date | string): DateTime =>
   typeof date === 'string' ? toDateTime(date) : DateTime.fromJSDate(date, TZ);

export default toDateTime;
