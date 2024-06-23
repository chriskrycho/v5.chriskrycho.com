import { $, $$, assert } from './utils.js';

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
