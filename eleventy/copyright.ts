const ROLLOVER_DATE = new Date('January 1, 2020')
const BASE = 'copyright Chris Krycho, 2019'
const LICENSE = {
   content: {
      name: 'Creative Commons Attribution 4.0',
      url:
         'https://github.com/chriskrycho/v5.chriskrycho.com/blob/master/LICENSE.md#Legalese-1',
   },
   implementation: {
      name: 'MIT',
      url:
         'https://github.com/chriskrycho/v5.chriskrycho.com/blob/master/LICENSE.md#software',
   },
}

const copyrightDate = (date: Date): string =>
   date >= ROLLOVER_DATE ? `${BASE}–${date.getFullYear()}` : BASE

const copyright = (date: Date, license: keyof typeof LICENSE = 'content'): string =>
   `${copyrightDate(date)} under a <a href='${LICENSE[license].url}'>${
      LICENSE[license].name
   }</a> license`

export default copyright
