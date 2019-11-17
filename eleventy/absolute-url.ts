import { Result } from 'true-myth'
import { URL } from 'url'
import { logErr, toString } from './utils'

export const absoluteUrl = (path: string, baseUrl: string): string =>
   Result.tryOrElse(logErr, () => new URL(path, baseUrl))
      .map(toString)
      .unwrapOr(path)

export default absoluteUrl
