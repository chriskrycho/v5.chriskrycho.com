import { fromDateOrString } from './date-time.ts';

export const localeDate = (date: Date | string, format = 'DDD'): string =>
   fromDateOrString(date).toFormat(format);

export default localeDate;
