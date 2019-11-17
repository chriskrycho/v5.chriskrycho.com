import { DateTime } from 'luxon'
import toDateTime from './to-date-time'

const OPTIONS = { zone: 'America/Denver' }

export const localeDate = (date: Date | string, format = 'DDD'): string =>
   (typeof date === 'string'
      ? toDateTime(date)
      : DateTime.fromJSDate(date, OPTIONS)
   ).toFormat(format)

export default localeDate
