import SiteConfig from '../site/_data/config'
type SiteConfig = typeof SiteConfig

const SEP = ' — '

const baseTitle = (siteName: string, authorName: string): string =>
   `${siteName}, by ${authorName}`

const extended = (base: string, itemTitle: string): string => `${itemTitle}${SEP}${base}`

export const siteTitle = (pageTitle: string | undefined, config: SiteConfig): string => {
   let base = baseTitle(config.title.normal, config.author.name)
   return pageTitle && pageTitle !== config.title.normal
      ? extended(base, pageTitle)
      : base
}

export default siteTitle
