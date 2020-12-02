import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Portfolio} from '../models/portfolio';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {StockService} from './stock.service';
import {ArticleService} from './article.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private portfolioSubject = new BehaviorSubject<Portfolio[]>(null);
  public portfolio$: Observable<Portfolio[]> = this.portfolioSubject.asObservable();

  private tickersSubject = new BehaviorSubject<string[]>(null);
  public tickers$: Observable<string[]> = this.tickersSubject.asObservable();

  public currentTicker: string = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private stockService: StockService,
    private articleService: ArticleService,
  ) {}

  getPortfolio() {
    // console.log('GetPortfolio Called');
    if (this.portfolioSubject.getValue() !== null) { return; }

    const id = this.authService.getId();
    const url = `${environment.apiUrl}/portfolio/${id}`;

    // console.log('Request to %s', url);
    this.http.get<Portfolio[]>(url).subscribe(
      (data) => {
        // console.log('Get Portfolio Response');
        // console.log(data);
        // console.log('CurrentTicker: %s', this.currentTicker);
        // console.log('Calling setPortfolioData');
        this.setPortfolioData(data);
        // console.log('After -- CurrentTicker: %s', this.currentTicker);
        // console.log('From Portfolio: Calling getStockInfo')
        this.getStockInfo();
        this.getArticles();
      }
    );
  }

  updatePortfolioDate(date: string) {
    console.log('UpdateDate called');
    if (this.portfolioSubject.getValue() === null) { return; }

    const id = this.authService.getId();
    const url = `${environment.apiUrl}/portfolio/${id}?date=${date}`;
    console.log(url);
    this.http.get<Portfolio[]>(url).subscribe(
      (data) => {
        if (data !== null && data.length > 0) {
          console.log('Update date: Updating Portfolio Data');
          console.log(data)
          this.setPortfolioData(data);
        }
      }
    );
  }


  getArticles() {
    this.articleService.getArticles(this.currentTicker);
  }

  getStockInfo() {
    this.stockService.getStockInfo(this.currentTicker);
  }

  getAllTickers() {
    // console.log('getAllTickers called');
    if (this.tickersSubject.getValue() !== null) {
      return;
    }

    const url = `${environment.apiUrl}/stocks`;

    this.http.get<string[]>(url).subscribe(
      (data) => {
        // console.log(data);
        this.tickersSubject.next(data);
      }
    );
  }

  getAddableTickers() {
    // console.log('getAddableTickers called');
    const allTickers: string[] = this.tickersSubject.getValue();
    const portfolioTickers: string[] = this.getPortfolioTickers();

    if (allTickers === null) {
      return [];
    }

    return allTickers.filter(t => portfolioTickers.indexOf(t) < 0);
  }

  addStock(ticker: string) {
    const id = this.authService.getId();
    const url = `${environment.apiUrl}/portfolio/${id}/add?ticker=${ticker}`;

    this.http.get<Portfolio[]>(url).subscribe(
      (data) => {
        // console.log(data);
        this.setPortfolioData(data);
        this.getStockInfo();
      }
    );
  }

  removeStock(ticker: string) {
    const id = this.authService.getId();
    const url = `${environment.apiUrl}/portfolio/${id}/delete?ticker=${ticker}`;

    this.http.get<Portfolio[]>(url).subscribe(
      (data) => {
        // console.log(data);
        this.setPortfolioData(data);
        this.getStockInfo();
      }
    );
  }

  setPortfolioData(data: any[]) {
    if (data) {
      const portfolio: Portfolio[] = [];

      if (data.length === 0) {
        this.portfolioSubject.next([]);
        this.currentTicker = null;
        return;
      }

      for (const d of data) {
        portfolio.push(new Portfolio(d));
      }

      this.portfolioSubject.next(portfolio);
      if (this.currentTicker === null || this.currentTicker === '') {
        this.currentTicker = data[0].ticker;
      } else {
        let found = false;
        for (const d of data) {
          if (d.ticker === this.currentTicker) {
            found = true;
            break;
          }
        }
        if (!found) {
          this.currentTicker = data[0].ticker;
        }
      }
    } else {
      this.portfolioSubject.next(null);
    }
  }

  getCurrentStockInfo() {
    for (const s of this.portfolioSubject.getValue()) {
      if (s.ticker === this.currentTicker) {
        return s;
      }
    }
  }

  getPortfolioTickers() {
    // console.log('getPortfolioTickers called');
    const arr: string[] = [];
    for (const s of this.portfolioSubject.getValue()) {
      arr.push(s.ticker);
    }
    return arr;
  }

}
