import { DateTime, DateTimeOptions } from 'luxon'
import { Maybe } from 'true-myth'

type Parse = (text: string, options?: DateTimeOptions | undefined) => DateTime

const maybeDateTime = (parse: Parse, input: string): Maybe<DateTime> => {
   const parsed = parse(input)
   return parsed.isValid ? Maybe.just(parsed) : Maybe.nothing()
}

const TZ = { zone: 'America/Denver' }

// Same parsing rules as 11ty itself uses: ISO or SQL, nothing else.
export const toDateTime = (input: string): DateTime => {
   return maybeDateTime(s => DateTime.fromISO(s, TZ), input)
      .or(maybeDateTime(s => DateTime.fromSQL(s, TZ), input))
      .unwrapOrElse(() => {
         throw new Error(`Could not parse date: ${input}`)
      })
}

export const canParseDate = (date: unknown): date is string | Date =>
   typeof date === 'string' || date instanceof Date

export const fromDateOrString = (date: Date | string): DateTime =>
   typeof date === 'string' ? toDateTime(date) : DateTime.fromJSDate(date)

export default toDateTime
