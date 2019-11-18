import SiteConfig from '../site/_data/config'

/** Link to the history of the file on GitHub */
export const history = (path: string) => `${SiteConfig.repo}/commits/master/${path}`

/** Link to edit the file on GitHub */
export const edit = (inputPath: string) => `${SiteConfig.repo}/edit/master/${inputPath}`

/** Link to view the file on GitHub */
export const source = (inputPath: string) => `${SiteConfig.repo}/blob/master/${inputPath}`
