// ---- Utility types
export interface Dict<T = unknown> {
   [key: string]: T | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction<T = any> = (...args: any[]) => T;
