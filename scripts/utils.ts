export const selectorFor = (item: string): string => `[data-sympolymathesy="${item}"]`

export function assert(pred: unknown, message: string): asserts pred {
   if (!pred) {
      throw new Error(message)
   }
}
