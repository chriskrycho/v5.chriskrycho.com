import { fromDateOrString } from './date-time';
import { TZ_OPTIONS } from './archive-by-year';

export const localeDate = (date: Date | string, format = 'DDD'): string =>
   fromDateOrString(date).toFormat(format, TZ_OPTIONS);

export default localeDate;
