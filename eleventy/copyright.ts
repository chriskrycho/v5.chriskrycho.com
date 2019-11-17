const ROLLOVER_DATE = new Date('January 1, 2020')
const BASE = '© Chris Krycho, 2019'
const LICENSE = 'Creative Commons Attribution 4.0'

const copyrightDate = (date: Date): string =>
   date >= ROLLOVER_DATE ? `${BASE}–${date.getFullYear()}` : BASE

const copyright = (date: Date): string => `${copyrightDate(date)} – ${LICENSE}`

export default copyright
