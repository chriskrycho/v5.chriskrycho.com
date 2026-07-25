import Maybe from 'true-myth/maybe';

export const filterMap = Symbol('v5.chriskrycho.com:IteratorObject.filterMap');

declare global {
   interface IteratorObject<T, TReturn, TNext> {
      [filterMap]<U extends {}>(
         fn: (value: T) => Maybe<U>,
      ): IteratorObject<U, undefined, unknown>;
   }
}

export function install() {
   if (Object.hasOwn(Iterator.prototype, filterMap)) {
      throw new Error(
         'Iterator.prototype already has v5.chriskrycho.com filterMap installed',
      );
   }

   Object.defineProperty(Iterator.prototype, filterMap, {
      value: function* <T, U extends {}>(
         this: IteratorObject<T>,
         fn: (value: T) => Maybe<U>,
      ): Generator<U> {
         for (const val of this) {
            let mapped = fn(val);
            if (mapped.isJust) {
               yield mapped.value;
            }
         }
      },
   });
}
