import { assert, unreachable } from './utils.js';
import * as Preferences from './preferences.js';
import getElements from './elements.js';

const enum State {
   Show,
   Hide,
}

function main() {
   const { Root, Container, Panel, Show, Close, ColorSchemes, NavMode } = getElements();

   // At initialization, make sure the initial values are set correctly.
   let { theme = Preferences.Theme.System, hideNav = false } = Preferences.load();
   Preferences.persistTheme(theme, Root);
   Preferences.persistNavMode(hideNav, Root);
   ColorSchemes.forEach((el) => {
      if (el.id === theme) {
         el.checked = true;
      }
   });
   NavMode.checked = hideNav;

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
         assert(Preferences.isTheme(target.value), 'misconfigured color scheme value');
         Preferences.persistTheme(target.value, Root);
      });
   });

   NavMode.addEventListener('change', ({ target }) => {
      assert(target instanceof HTMLInputElement, 'misconfigured reading theme input');
      Preferences.persistNavMode(target.checked, Root);
   });
}

main();
