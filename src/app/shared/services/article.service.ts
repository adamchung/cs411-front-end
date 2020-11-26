import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {StockInfo} from '../models/stock-info';
import {NewsData} from '../models/news-data';
import {sample} from 'rxjs/operators';
import {PortfolioService} from './portfolio.service';
import {environment} from '../../../environments/environment';
import {Portfolio} from '../models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleSubject = new BehaviorSubject<NewsData[]>(null);
  public article$: Observable<NewsData[]> = this.articleSubject.asObservable();

  constructor(
    private http: HttpClient,
    private portfolioService: PortfolioService,
  ) {}

  getArticles() {
    console.log('GetArticles called');
    const current = this.portfolioService.currentTicker;
    if (!current) {
      console.log('No current ticker!');
      this.articleSubject.next(null);
      return;
    }

    if (this.articleSubject.getValue() !== null
      && this.articleSubject.getValue().length > 0) {
      if (this.articleSubject.getValue()[0].ticker === current) {
        console.log('Data already loaded');
        return;
      }
    }

    this.articleSubject.next(null);

    const url = `${environment.apiUrl}/articles?ticker=${current}`;

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
