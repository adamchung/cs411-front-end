export class StockPrice {
  id: number;
  ticker: string;
  volume: number;
  low: number;
  high: number;
  open: number;
  close: number;
  date: Date;

  constructor(data: any) {
    Object.assign(this, data);

    // Assigning date
    if (data.date) {
      this.date = new Date(data.date);
    }
  }
}
