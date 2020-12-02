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

export class BigNewsData {
  ticker: string;
  bigdate: Date;
  percentdiff: number;
  title: string;
  contents: string;
  articledate: Date;
  positivity: number;
  link: string;
  articleID: number;

  constructor(data: any) {
    Object.assign(this, data);

    if (data.bigdate) {
      this.bigdate = new Date(data.bigdate);
      this.bigdate.setTime(this.bigdate.getTime() + this.bigdate.getTimezoneOffset() * 60 * 1000);
    }

    if (data.articledate) {
      this.articledate = new Date(data.articledate);
      this.articledate.setTime(this.articledate.getTime() + this.articledate.getTimezoneOffset() * 60 * 1000);
    }

    // Truncating contents

  }
}
