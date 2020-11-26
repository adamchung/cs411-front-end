export class NewsData {
  articleID: number;
  title: string;
  contents: string;
  articleDate: Date;
  positivity: number;
  ticker: string;

  constructor(data: any) {
    Object.assign(this, data);

    // Creating date object
    if (this.articleDate) {
      this.articleDate = new Date(data.articleDate);
      this.articleDate.setTime(this.articleDate.getTime() + this.articleDate.getTimezoneOffset() * 60 * 1000);
    }
  }
}
