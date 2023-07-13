import { tryOrElse } from 'true-myth/result';
import { URL } from 'url';
import { logErr, toString } from './utils';

export const absoluteUrl = (path: string, baseUrl: string): string =>
   tryOrElse(logErr, () => new URL(path, baseUrl))
      .map(toString)
      .unwrapOr(path);

export default absoluteUrl;
