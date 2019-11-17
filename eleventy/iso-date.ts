import { DateTime } from 'luxon'
import toDateTime from './to-date-time'

const OPTIONS = { zone: 'America/Denver' }

const isoDate = (date: Date | string): string =>
   (typeof date === 'string'
      ? toDateTime(date)
      : DateTime.fromJSDate(date, OPTIONS)
   ).toString()

export default isoDate
