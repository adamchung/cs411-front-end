import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {BigNewsData, NewsData} from '../models/news-data';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleSubject = new BehaviorSubject<NewsData[]>(null);
  public article$: Observable<NewsData[]> = this.articleSubject.asObservable();

  private bigArticleSubject = new BehaviorSubject<BigNewsData[]>(null);
  public bigArticle$: Observable<BigNewsData[]> = this.bigArticleSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  getArticles(ticker: string) {
    // console.log('GetArticles called');
    if (!ticker) {
      // console.log('No current ticker!');
      this.articleSubject.next(null);
      this.bigArticleSubject.next(null);
      return;
    }

    if (this.articleSubject.getValue() !== null
      && this.articleSubject.getValue().length > 0) {
      if (this.articleSubject.getValue()[0].ticker === ticker) {
        // console.log('Data already loaded');
        return;
      }
    }

    this.articleSubject.next(null);
    this.bigArticleSubject.next(null);

    const url = `${environment.apiUrl}/articles/${ticker}?endDate=2020-11-29&startDate=2020-12-01`;
    console.log('Getting articles for %s', ticker);
    this.http.get<NewsData[]>(url).subscribe(
      (data) => {
        console.log('Articles data');
        console.log(data);
        if (data) {
          const news: NewsData[] = [];

          for (const d of data) {
            news.push(new NewsData(d));
          }
          this.articleSubject.next(news);
          // console.log(this.articleSubject.getValue());
        } else {
          this.articleSubject.next(null);
        }
      }
    );

    const bigurl = `${environment.apiUrl}/articles/big/${ticker}`;
    this.http.get<BigNewsData[]>(bigurl).subscribe(
      (data) => {
        console.log('Raw Data response');
        console.log(data);
        if (data) {

          const news: BigNewsData[] = [];

          for (const d of data) {
            news.push(new BigNewsData(d));
          }

          this.bigArticleSubject.next(news);
          // console.log(this.articleSubject.getValue());
        } else {
          this.bigArticleSubject.next(null);
        }
      }
    );
  }
}
