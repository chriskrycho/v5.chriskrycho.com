export interface Preferences {
   theme: Theme;
   hideNav: boolean;
}

/** Defines the class names for the theme */
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

   @param newTheme The new theme to set on that `html` element.
   @param element The target element to set the class on.
 */
const updateThemeClass = (newTheme: Theme, element: HTMLElement): void => {
   THEME_VALUES.forEach((className) => element.classList.remove(className));
   if (newTheme !== Theme.System) element.classList.add(newTheme);
};

function updateReadingModeClass(inReadingMode: boolean, element: HTMLElement): void {
   if (inReadingMode) {
      element.classList.add('hide-side-nav');
   } else {
      element.classList.remove('hide-side-nav');
   }
}

const enum LocalStorage {
   Theme = 'sympolymathesy:theme',
   NavMode = 'sympolymathesy:hide-side-nav',
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

function saveReadingModePreference(hideNav: boolean): void {
   if (hideNav) {
      localStorage.setItem(LocalStorage.NavMode, 'hide');
   } else {
      localStorage.removeItem(LocalStorage.NavMode);
   }
}

export function load(): Preferences {
   const themeFromStorage = localStorage.getItem(LocalStorage.Theme);
   const theme =
      themeFromStorage && isTheme(themeFromStorage) ? themeFromStorage : Theme.System;

   const hideNav = localStorage.getItem(LocalStorage.NavMode) === 'hide';

   return { theme, hideNav };
}

export function persistTheme(newTheme: Theme, onElement: HTMLElement) {
   updateThemeClass(newTheme, onElement);
   saveThemePreference(newTheme);
}

export function persistNavMode(inReadingMode: boolean, onElement: HTMLElement) {
   updateReadingModeClass(inReadingMode, onElement);
   saveReadingModePreference(inReadingMode);
}
