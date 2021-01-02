import { assert, selectorFor } from './utils'

const ROOT_EL = document.querySelector(selectorFor('root'))
assert(ROOT_EL instanceof HTMLElement, 'missing root element')

const PREFERENCES_EL = document.querySelector(selectorFor('preferences'))
assert(PREFERENCES_EL instanceof HTMLElement, 'missing preferences mount element')
PREFERENCES_EL.classList.remove('no-js-hidden')

export interface Preferences {
   theme: Theme
   readingMode: boolean
}

export enum Theme {
   System = 'system',
   Light = 'light',
   Dark = 'dark',
}

const THEME_VALUES: string[] = [Theme.System, Theme.Light, Theme.Dark]

export const stringIsTheme = (s: string): s is Theme => THEME_VALUES.includes(s)

/**
   Update the style class on the root (`html`) element.

   @param root The `html` element
   @param newTheme The new theme to set on that `html` element.
 */
const updateThemeClass = (newTheme: Theme): void => {
   THEME_VALUES.forEach((className) => ROOT_EL.classList.remove(className))
   if (newTheme !== Theme.System) ROOT_EL.classList.add(newTheme)
}

const updateReadingModeClass = (inReadingMode: boolean): void => {
   if (inReadingMode) {
      ROOT_EL.classList.add('reading-mode')
   } else {
      ROOT_EL.classList.remove('reading-mode')
   }
}

const enum LocalStorage {
   Theme = 'sympolymathesy:theme',
   ReadingMode = 'sympolymathesy:reading-mode',
}

// If the user chooses to follow the OS, simply delete the key from local storage: there
// is no need to *store* "use the OS".
const saveThemePreference = (theme: Theme): void =>
   theme === Theme.System
      ? localStorage.removeItem(LocalStorage.Theme)
      : localStorage.setItem(LocalStorage.Theme, theme)

const saveReadingModePreference = (inReadingMode: boolean): void =>
   inReadingMode
      ? localStorage.setItem(LocalStorage.ReadingMode, 'true')
      : localStorage.removeItem(LocalStorage.ReadingMode)

export const loadPreferences = (): Preferences => {
   const themeFromStorage = localStorage.getItem(LocalStorage.Theme)
   const theme =
      themeFromStorage && stringIsTheme(themeFromStorage)
         ? themeFromStorage
         : Theme.System

   const readingMode = localStorage.getItem(LocalStorage.ReadingMode) === 'true'

   return { theme, readingMode }
}

export const persistTheme = (newTheme: Theme): void => {
   updateThemeClass(newTheme)
   saveThemePreference(newTheme)
}

export const persistReadingMode = (inReadingMode: boolean): void => {
   updateReadingModeClass(inReadingMode)
   saveReadingModePreference(inReadingMode)
}
