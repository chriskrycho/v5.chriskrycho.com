import { $, $$, assert } from './utils.js';

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

   const ColorSchemes = $$('theme') as NodeListOf<HTMLInputElement>;
   assert(
      ColorSchemes.length === 3 &&
         Array.from(ColorSchemes).every(
            (scheme) => scheme instanceof HTMLInputElement && scheme.type === 'radio',
         ),
      'misconfigured color schemes',
   );

   const ReadingMode = $('reading-mode') as HTMLInputElement;
   assert(
      ReadingMode instanceof HTMLInputElement && ReadingMode.type === 'checkbox',
      'misconfigured reading mode',
   );

   return { Root, Container, Panel, Show, Close, ColorSchemes, ReadingMode };
}
