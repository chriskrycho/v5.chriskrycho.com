export function assert(pred: unknown, message: string): asserts pred {
   if (!pred) {
      throw new Error(message);
   }
}

export function unreachable(value: never): never {
   throw new Error(`Should have been unreachable with ${value}`);
}

const selectorFor = (item: string): string => `[data-sympolymathesy="${item}"]`;
export const $ = (item: string) => document.querySelector(selectorFor(item));
export const $$ = (item: string) =>
   Array.from(document.querySelectorAll(selectorFor(item)));
