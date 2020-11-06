export class Article {
  id: number;
  title: string;
  text: string;
  articleDate: Date;
  positivity: number;

  constructor(data: any) {
    Object.assign(this, data);

    if (data.articleDate) { // if there is a valid article date
      this.articleDate = new Date(data.articleDate);
    }
  }
}
