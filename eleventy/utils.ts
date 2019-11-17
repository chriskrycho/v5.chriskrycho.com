import { env } from 'process'

interface ToString {
   toString(): string
}

export const toString = (a: ToString) => a.toString()

export const logErr = (err: unknown): void => {
   if (env['DEBUG']) {
      console.error(err)
   }
}
