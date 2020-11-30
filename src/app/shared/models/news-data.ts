export class NewsData {
  articleID: number;
  title: string;
  contents: string;
  date: Date;
  positivity: number;
  ticker: string;
  link: string;

  constructor(data: any) {
    // Object.assign(this, data);
    //
    // // Creating date object
    // if (data.date) {
    //   this.date = new Date(data.date);
    //   this.date.setTime(this.date.getTime() + this.date.getTimezoneOffset() * 60 * 1000);
    // }

    // Updated code for neo4j
    if (data.length === 6) {
      this.title = data[0];
      this.contents = data[1];
      this.positivity = data[3];
      this.ticker = data[4];
      this.articleID = data[5];

      this.date = new Date(data[2]);
      this.date.setTime(this.date.getTime() + this.date.getTimezoneOffset() * 60 * 1000);
    }

  }
}
