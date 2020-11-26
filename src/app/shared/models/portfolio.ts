export class Portfolio {
  public ticker: string;
  public companyName: string;
  public marketCap: string;
  public open: number;
  public close: number;
  public low: number;
  public high: number;
  public date: Date;

  constructor(data: any) {
    this.ticker = data.ticker;
    this.companyName = data['company-name'];
    this.marketCap = data['market-cap'];
    this.open = data.open;
    this.close = data.close;
    this.low = data.low;
    this.high = data.high;
    this.date = new Date(data.date);
    // Time zone correction
    this.date.setTime(this.date.getTime() + this.date.getTimezoneOffset() * 60 * 1000);
    console.log('New Portfolio created');
    console.log(data);
    console.log(this);
  }
}
