export class Article {
  id: number;
  title: string;
  text: string;
  articleDate: Date;
  positivity: number;

  constructor(data: any) {
    Object.assign(this, data);

    this.articleDate = new Date(data.articleDate);
    // Time zone corrections
    this.articleDate.setTime(this.articleDate.getTime() + this.articleDate.getTimezoneOffset() * 60 * 1000);
  }
}
