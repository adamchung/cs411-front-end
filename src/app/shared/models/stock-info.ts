export class StockInfo {
  ticker: string;
  companyName: string;
  marketCap: string;
  data: {
    open: number;
    close: number;
    low: number;
    high: number;
    date: Date;
  }[];

  constructor(data: any) {
    if (data) {
      this.ticker = data.ticker;
      this.companyName = data['company-name'];
      this.marketCap = data['market-cap'];

      if (data.data && data.data.length > 0) {
        const newData = [];

        for (const raw of data.data) {
          const d = {
            open: raw.open,
            close: raw.close,
            low: raw.low,
            high: raw.high,
            date: new Date(raw.date),
          };

          // console.log('\n\n\nDate String: %s', raw.date);
          // console.log('Uncorrected Date:');
          // console.log(d.date);

          // Fixing time zone offset
          d.date.setTime(d.date.getTime() + d.date.getTimezoneOffset() * 60 * 1000);
          // console.log('Corrected Date:');
          // console.log(d.date);

          newData.push(d);
        }

        this.data = newData;
      }
    }
  }
}

