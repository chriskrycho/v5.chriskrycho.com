import path from 'path';

const EXCLUDES = ['.', 'site'];

const excluded = (entry: string): boolean => !EXCLUDES.includes(entry);

/** Get the collection corresponding to a given path slug */
export function toCollection(slug: string): string | undefined {
   return path.dirname(slug.trim()).split(path.sep).filter(excluded)[0];
}

export default toCollection;
