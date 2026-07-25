import { fromDateOrString } from './date-time.ts';

const isoDate = (date: Date | string): string => {
   if (!date) {
      throw new Error(`Could not parse '${date}' as date`);
   }
   let dateString = fromDateOrString(date).toISO({ includeOffset: true });
   if (!dateString) {
      throw new Error(`Could not convert '${date}' to date string`);
   }

   return dateString;
};

export default isoDate;
