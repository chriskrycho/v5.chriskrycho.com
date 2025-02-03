const Formatter = new Intl.NumberFormat('en-US', { style: 'decimal' });

export function roughWordCount(source: string): string {
   let actual = source.split(' ').length;
   let rounded = round(actual);

   return `About ${Formatter.format(rounded)} words`;
}

function round(n: number): number {
   if (n < 100) {
      return Math.round(n / 10) * 10;
   }

   if (n < 1000) {
      return Math.round(n / 50) * 50;
   }

   return Math.round(n / 500) * 500;
}
