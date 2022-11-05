import { $, $$, assert } from './utils.js';

// SAFETY: we immediately check (in debug!) that each cast is correct.
export default function getElements() {
   const Root = $('root') as HTMLElement;
   assert(Root instanceof HTMLElement, 'misconfigured root element');

   const Container = $('preferences') as HTMLElement;
   assert(Container instanceof HTMLElement, 'misconfigured preferences element');
   Container.classList.remove('no-js-hidden');

   const Panel = $('panel') as HTMLElement;
   assert(Panel instanceof HTMLElement, 'misconfigured panel element');

   const Show = $('show') as HTMLButtonElement;
   assert(Show instanceof HTMLButtonElement, 'misconfigured adjust element');

   const Close = $('close') as HTMLButtonElement;
   assert(Close instanceof HTMLButtonElement, 'misconfigured adjust element');

   const ColorSchemes = $$('theme') as NodeListOf<HTMLInputElement>;
   assert(
      ColorSchemes.length === 3 &&
         Array.from(ColorSchemes).every(
            (scheme) => scheme instanceof HTMLInputElement && scheme.type === 'radio',
         ),
      'misconfigured color schemes',
   );

   const NavMode = $('hide-side-nav') as HTMLInputElement;
   assert(
      NavMode instanceof HTMLInputElement && NavMode.type === 'checkbox',
      'misconfigured reading mode',
   );

   return { Root, Container, Panel, Show, Close, ColorSchemes, NavMode };
}
