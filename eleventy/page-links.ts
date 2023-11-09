import SiteConfig from '../site/_data/config'

const corrected = (path: string): string => path.replace(/^\.\//, '')

/** Link to the history of the file on GitHub */
export const history = (path: string): string =>
   `${SiteConfig.repo}/commits/master/${corrected(path)}`

/** Link to edit the file on GitHub */
export const edit = (inputPath: string): string =>
   `${SiteConfig.repo}/edit/master/${corrected(inputPath)}`

/** Link to view the file on GitHub */
export const source = (inputPath: string): string =>
   `${SiteConfig.repo}/blob/master/${corrected(inputPath)}`
