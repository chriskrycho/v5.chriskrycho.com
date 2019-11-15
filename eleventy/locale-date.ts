import { DateTime } from 'luxon'

const OPTIONS = { zone: 'utc' }

export default function localeDate(date: Date | string, format = 'DDDD'): string {
   const dateTime =
      typeof date === 'string'
         ? DateTime.fromSQL(date, OPTIONS)
         : DateTime.fromJSDate(date, OPTIONS)

   return dateTime.toFormat(format)
}
