function main() {
   const { Root, Container, Panel, Show, Close, ColorSchemes, NavMode } = getElements();

   // At initialization, make sure the initial values are set correctly.
   let { theme = Theme.System, hideNav = false } = load();
   persistTheme(theme, Root);
   persistNavMode(hideNav, Root);
   ColorSchemes.forEach((el) => {
      if (el.id === theme) {
         el.checked = true;
      }
   });
   NavMode.checked = hideNav;

   const enum State {
      Show,
      Hide,
   }

   function setPanelTo(state: State) {
      switch (state) {
         case State.Show:
            Show.classList.add('hidden');
            Panel.classList.remove('hidden');
            Container.classList.add('preferences__open');
            break;
         case State.Hide:
            Panel.classList.add('hidden');
            Show.classList.remove('hidden');
            Container.classList.remove('preferences__open');
            break;
         default:
            unreachable(state);
      }
   }

   document.addEventListener('click', ({ target }) => {
      assert(
         target instanceof Node,
         'What in the world is firing a non-`Node`-target event?',
      );
      if (!Panel.contains(target)) {
         setPanelTo(State.Hide);
      }
   });

   Show.addEventListener('click', (event) => {
      event.stopPropagation();
      setPanelTo(State.Show);
   });

   Close.addEventListener('click', (event) => {
      event.stopPropagation();
      setPanelTo(State.Hide);
   });

   ColorSchemes.forEach((colorSchemeEl) => {
      colorSchemeEl.addEventListener('change', ({ target }) => {
         assert(target instanceof HTMLInputElement, 'misconfigured color scheme input');
         assert(isTheme(target.value), 'misconfigured color scheme value');
         persistTheme(target.value, Root);
      });
   });

   NavMode.addEventListener('change', ({ target }) => {
      assert(target instanceof HTMLInputElement, 'misconfigured reading theme input');
      persistNavMode(target.checked, Root);
   });
}

function load(): {
   theme: Theme;
   hideNav: boolean;
} {
   const themeFromStorage = localStorage.getItem(LocalStorage.Theme);
   const theme =
      themeFromStorage && isTheme(themeFromStorage) ? themeFromStorage : Theme.System;

   const hideNav = localStorage.getItem(LocalStorage.NavMode) === 'hide';

   return { theme, hideNav };
}

function persistTheme(newTheme: Theme, onElement: HTMLElement) {
   updateThemeClass(newTheme, onElement);
   saveThemePreference(newTheme);
}

function persistNavMode(inReadingMode: boolean, onElement: HTMLElement) {
   updateReadingModeClass(inReadingMode, onElement);
   saveReadingModePreference(inReadingMode);
}

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

// SAFETY: we immediately check (in debug!) that each cast is correct.
export default function getElements() {
   const Root = $('root');
   assert(Root instanceof HTMLElement, 'misconfigured root element');

   const Container = $('preferences');
   assert(Container instanceof HTMLElement, 'misconfigured preferences element');
   Container.classList.remove('no-js-hidden');

   const Panel = $('panel');
   assert(Panel instanceof HTMLElement, 'misconfigured panel element');

   const Show = $('show');
   assert(Show instanceof HTMLButtonElement, 'misconfigured adjust element');

   const Close = $('close');
   assert(Close instanceof HTMLButtonElement, 'misconfigured adjust element');

   const ColorSchemes = $$('theme');
   assert(
      ColorSchemes.length === 3 &&
         ((cs: typeof ColorSchemes): cs is NodeListOf<HTMLInputElement> =>
            Array.from(cs).every(
               (scheme) => scheme instanceof HTMLInputElement && scheme.type === 'radio',
            ))(ColorSchemes),
      'misconfigured color schemes',
   );

   const NavMode = $('hide-side-nav');
   assert(
      NavMode instanceof HTMLInputElement && NavMode.type === 'checkbox',
      'misconfigured reading mode',
   );

   return { Root, Container, Panel, Show, Close, ColorSchemes, NavMode };
}

function assert(pred: unknown, message: string): asserts pred {
   if (!pred) {
      throw new Error(message);
   }
}

function unreachable(value: never): never {
   throw new Error(`Should have been unreachable with ${value}`);
}

const selectorFor = (item: string): string => `[data-sympolymathesy="${item}"]`;
export const $ = (item: string) => document.querySelector(selectorFor(item));
export const $$ = (item: string) => document.querySelectorAll(selectorFor(item));

/** Defines the class names for the theme */
const enum Theme {
   System = 'system',
   Light = 'light',
   Dark = 'dark',
}

// Intentionally throw away type checking here.
const THEME_VALUES: string[] = [Theme.System, Theme.Light, Theme.Dark];

const isTheme = (s: string): s is Theme => THEME_VALUES.includes(s);

main();
