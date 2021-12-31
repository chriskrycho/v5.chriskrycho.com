import { assert, unreachable } from './utils.js';
import {
   loadPreferences,
   persistReadingMode,
   persistTheme,
   Theme,
   isTheme,
} from './preferences.js';
import getElements from './elements.js';

const enum State {
   Show,
   Hide,
}

function main() {
   const { Root, Panel, Show, Close, ColorSchemes, ReadingMode } = getElements();

   // At initialization, make sure the initial values are set correctly.
   let { theme = Theme.System, readingMode = false } = loadPreferences();
   persistTheme(theme, Root);
   persistReadingMode(readingMode, Root);
   ColorSchemes.find((el) => el.id === theme)!.checked = true;
   ReadingMode.checked = readingMode;

   function setPanelTo(state: State) {
      switch (state) {
         case State.Show:
            Show.classList.add('hidden');
            Panel.classList.remove('hidden');
            break;
         case State.Hide:
            Panel.classList.add('hidden');
            Show.classList.remove('hidden');
            break;
         default:
            unreachable(state);
      }
   }

   Show.addEventListener('click', () => {
      setPanelTo(State.Show);
   });

   Close.addEventListener('click', () => {
      setPanelTo(State.Hide);
   });

   // Use `this.value` and `this.checked` because they're guaranteed to be the right type.
   // `event.target` and `event.currentTarget` are *not*: they are `EventTarget | null`.
   ColorSchemes.forEach((colorSchemeEl) => {
      colorSchemeEl.addEventListener('change', function () {
         assert(isTheme(this.value), 'misconfigured color scheme value');
         persistTheme(this.value, Root);
      });
   });

   ReadingMode.addEventListener('change', function () {
      persistReadingMode(this.checked, Root);
   });
}

main();
