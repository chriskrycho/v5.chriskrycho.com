const Formatter = new Intl.NumberFormat('en-US', { style: 'decimal' });

export function roughWordCount(source: string): string {
   let actual = source.split(' ').length;
   let rounded = round(actual);

   return `About ${Formatter.format(rounded)} words`;
}

function round(n: number): number {
   return n < 100 ? Math.round(n / 10) * 10 : Math.round(n / 50) * 50;
}
