export interface Preferences {
   theme: Theme;
   readingMode: boolean;
}

export const enum Theme {
   System = 'system',
   Light = 'light',
   Dark = 'dark',
}

// Intentionally throw away type checking here.
const THEME_VALUES: string[] = [Theme.System, Theme.Light, Theme.Dark];

export const isTheme = (s: string): s is Theme => THEME_VALUES.includes(s);

/**
   Update the style class on the root (`html`) element.

   @param root The `html` element
   @param newTheme The new theme to set on that `html` element.
 */
const updateThemeClass = (newTheme: Theme, element: HTMLElement): void => {
   THEME_VALUES.forEach((className) => element.classList.remove(className));
   if (newTheme !== Theme.System) element.classList.add(newTheme);
};

function updateReadingModeClass(inReadingMode: boolean, element: HTMLElement): void {
   if (inReadingMode) {
      element.classList.add('reading-mode');
   } else {
      element.classList.remove('reading-mode');
   }
}

const enum LocalStorage {
   Theme = 'sympolymathesy:theme',
   ReadingMode = 'sympolymathesy:reading-mode',
}

// If the user chooses to follow the OS, simply delete the key from local storage: there
// is no need to *store* "use the OS".
function saveThemePreference(theme: Theme): void {
   if (theme !== Theme.System) {
      localStorage.setItem(LocalStorage.Theme, theme);
   } else {
      localStorage.removeItem(LocalStorage.Theme);
   }
}

function saveReadingModePreference(inReadingMode: boolean): void {
   if (inReadingMode) {
      localStorage.setItem(LocalStorage.ReadingMode, 'true');
   } else {
      localStorage.removeItem(LocalStorage.ReadingMode);
   }
}

export function load(): Preferences {
   const themeFromStorage = localStorage.getItem(LocalStorage.Theme);
   const theme =
      themeFromStorage && isTheme(themeFromStorage) ? themeFromStorage : Theme.System;

   const readingMode = localStorage.getItem(LocalStorage.ReadingMode) === 'true';

   return { theme, readingMode };
}

export function persistTheme(newTheme: Theme, onElement: HTMLElement) {
   updateThemeClass(newTheme, onElement);
   saveThemePreference(newTheme);
}

export function persistReadingMode(inReadingMode: boolean, onElement: HTMLElement) {
   updateReadingModeClass(inReadingMode, onElement);
   saveReadingModePreference(inReadingMode);
}
