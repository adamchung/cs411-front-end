export class NewsData {
  articleID: number;
  title: string;
  contents: string;
  date: Date;
  positivity: number;
  ticker: string;
  link: string;

  constructor(data: any) {
    Object.assign(this, data);

    // Creating date object
    if (data.date) {
      this.date = new Date(data.date);
      this.date.setTime(this.date.getTime() + this.date.getTimezoneOffset() * 60 * 1000);
    }
  }
}
