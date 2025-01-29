import SiteConfig from '../site/_data/config.js';

const corrected = (path: string): string => path.replace(/^\.\//, '');

const renderable = (path: string) => encodeURIComponent(corrected(path));

/** Link to the history of the file on GitHub */
export const history = (path: string): string =>
   `${SiteConfig.repo}/commits/main/${renderable(path)}`;

/** Link to edit the file on GitHub */
export const edit = (inputPath: string): string =>
   `${SiteConfig.repo}/edit/main/${renderable(inputPath)}`;

/** Link to view the file on GitHub */
export const source = (inputPath: string): string =>
   `${SiteConfig.repo}/blob/main/${renderable(inputPath)}`;
