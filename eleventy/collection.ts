import path from 'path';

const EXCLUDES = ['.', 'site'];

const excluded = (entry: string): boolean => !EXCLUDES.includes(entry);

export const collectionName = ({ from: pathString }: { from: string }): string =>
   pathString.split(path.sep).filter(excluded).join('__');

/** Get the collection corresponding to a given path slug */
export const toCollection = (slug: string): string =>
   collectionName({ from: path.dirname(slug.trim()) });

export const toCollectionUrl = (
   slug: string,
   isGhostCollection?: boolean,
): string | undefined =>
   isGhostCollection
      ? toRootCollection(slug)
      : toCollection(slug)
           .split('__')
           .map(
              (subPaths) =>
                 subPaths
                    .split(' ') // "A B C" -> ["A", "B", "C"]
                    .map((w) => w.toLowerCase()) // -> ["a", "b", "c"]
                    .join('-'), // -> "a-b-c"
           )
           .join('/');

export const toCollectionName = (
   slug: string,
   isGhostCollection?: boolean,
): string | undefined =>
   isGhostCollection ? toRootCollection(slug) : toCollection(slug).replace(/__/g, ': ');

export const toRootCollection = (slug: string): string | undefined =>
   collectionName({ from: path.dirname(slug.trim()) }).split('__')[0];
