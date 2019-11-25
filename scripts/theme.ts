const enum Theme {
   System = 'system',
   Light = 'light',
   Dark = 'dark',
}

const THEME_VALUES = [Theme.System, Theme.Light, Theme.Dark]

const stringIsTheme = (s: string): s is Theme => (THEME_VALUES as string[]).includes(s)

const themeFromInput = (event: Event): Theme =>
   event.target instanceof HTMLInputElement && stringIsTheme(event.target.value)
      ? event.target.value
      : Theme.System

/**
   Update the style class on the root (`html`) element.

   @param root The `html` element
   @param newTheme The new theme to set on that `html` element.

   @warning This is ***IMPURE***: it mutates DOM.
 */
const updateRootClass = (root: HTMLElement, newTheme: Theme): void => {
   THEME_VALUES.forEach(className => root.classList.remove(className))
   if (newTheme !== Theme.System) root.classList.add(newTheme)
}

const LOCAL_STORAGE_KEY = `chriskrycho.com:theme`

/**
   If the user chooses to follow the OS, simply delete the key from local storage: there
   is no need to *store* "use the OS".

   @param theme The new theme to save as the user's preference

   @warning This is ***IMPURE***: it interacts with `localStorage`
 */
const savePreference = (theme: Theme): void =>
   theme === Theme.System
      ? localStorage.removeItem(LOCAL_STORAGE_KEY)
      : localStorage.setItem(LOCAL_STORAGE_KEY, theme)

const loadPreference = (): Theme => {
   const fromStorage = localStorage.getItem(LOCAL_STORAGE_KEY)
   return fromStorage && stringIsTheme(fromStorage) ? fromStorage : Theme.System
}

const setThemeOn = (root: HTMLElement) => (event: Event, ..._: any[]): void => {
   const theme = themeFromInput(event)
   updateRootClass(root, theme)
   savePreference(theme)
}

window.onload = () => {
   const root = document.querySelector('html')
   const form = document.querySelector('#theme-chooser')
   if (!root || !form) {
      return
   }

   const theme = loadPreference()
   updateRootClass(root, theme)
   document.querySelector(`input[value=${theme}]`)?.setAttribute('checked', 'checked')

   document
      .querySelectorAll('#theme-chooser input')
      .forEach(input => input.addEventListener('input', setThemeOn(root)))

   form.classList.remove('no-js-hidden')
}
