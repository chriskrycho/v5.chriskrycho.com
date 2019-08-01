const { DateTime } = require('luxon')
const { DATE_FULL } = DateTime

const OPTIONS = { zone: 'utc' }

/**
   @param {Date | string} date 
   @returns {string}
 */
function localeDate(date, format = DATE_FULL) {
   const dateTime =
      typeof date === 'string'
         ? DateTime.fromSQL(date, OPTIONS)
         : DateTime.fromJSDate(date, OPTIONS)

   return dateTime.toLocaleString(format)
}

module.exports = localeDate
