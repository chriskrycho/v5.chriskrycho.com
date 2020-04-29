import { fromDateOrString } from './date-time'

const isoDate = (date: Date | string): string =>
   fromDateOrString(date).toISO({ includeOffset: true })

export default isoDate
