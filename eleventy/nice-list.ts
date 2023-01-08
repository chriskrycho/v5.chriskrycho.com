import { Maybe } from 'true-myth';

let formatter = new Intl.ListFormat('en', { type: 'conjunction', style: 'long' });
let format = formatter.format.bind(formatter);

export default function niceList(strings?: string[]): Maybe<string> {
   return Maybe.of(strings)
      .map(format)
      .andThen((s) => (s === '' ? Maybe.nothing() : Maybe.just(s)));
}
