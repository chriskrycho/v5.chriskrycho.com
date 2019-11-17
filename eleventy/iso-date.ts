import { fromDateOrString } from './date-time'

const isoDate = (date: Date | string): string => fromDateOrString(date).toISO()

export default isoDate
