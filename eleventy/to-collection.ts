import path from 'path'
/** Get the collection corresponding to a given path slug */
export function toCollection(slug: string): string | undefined {
   return path
      .dirname(slug.trim())
      .split(path.sep)
      .pop()
}

export default toCollection
