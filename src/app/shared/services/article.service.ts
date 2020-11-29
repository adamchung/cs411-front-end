import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {NewsData} from '../models/news-data';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleSubject = new BehaviorSubject<NewsData[]>(null);
  public article$: Observable<NewsData[]> = this.articleSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  getArticles(ticker: string) {
    console.log('GetArticles called');
    if (!ticker) {
      console.log('No current ticker!');
      this.articleSubject.next(null);
      return;
    }

    if (this.articleSubject.getValue() !== null
      && this.articleSubject.getValue().length > 0) {
      if (this.articleSubject.getValue()[0].ticker === ticker) {
        console.log('Data already loaded');
        return;
      }
    }

    this.articleSubject.next(null);

    const url = `${environment.apiUrl}/articles?ticker=${ticker}`;

    this.http.get<NewsData[]>(url).subscribe(
      (data) => {
        console.log(data);
        if (data && data.length > 0) {
          const news: NewsData[] = [];

          for (const d of data) {
            news.push(new NewsData(d));
          }

          this.articleSubject.next(news);
          console.log(this.articleSubject.getValue());
        } else {
          this.articleSubject.next(null);
        }
      }
    );
  }
}
