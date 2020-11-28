import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Portfolio} from '../models/portfolio';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {StockService} from './stock.service';

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
    private stockService: StockService,
  ) {}

  getPortfolio() {
    if (this.portfolioSubject.getValue() !== null) { return; }

    const url = `${environment.apiUrl}/portfolio/1`;

    this.http.get<Portfolio[]>(url).subscribe(
      (data) => {
        this.setPortfolioData(data);
      }
    );
  }

  getStockInfo() {
    this.stockService.getStockInfo(this.currentTicker);
  }

  getAllTickers() {
    console.log('getAllTickers called');
    if (this.tickersSubject.getValue() !== null) {
      return;
    }

    const url = `${environment.apiUrl}/stocks`;

    this.http.get<string[]>(url).subscribe(
      (data) => {
        console.log(data);
        this.tickersSubject.next(data);
        this.getStockInfo();
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
    const url = `${environment.apiUrl}/portfolio/1/add?ticker=${ticker}`;

    this.http.get<Portfolio[]>(url).subscribe(
      (data) => {
        // console.log(data);
        this.setPortfolioData(data);
      }
    );
  }

  removeStock(ticker: string) {
    const url = `${environment.apiUrl}/portfolio/1/delete?ticker=${ticker}`;

    this.http.get<Portfolio[]>(url).subscribe(
      (data) => {
        // console.log(data);
        this.setPortfolioData(data);
      }
    );
  }

  setPortfolioData(data: any[]) {
    console.log('Set portfolio data called');
    console.log(data);
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
      console.log('Current ticker: %s', this.currentTicker);
      if (this.currentTicker === null || this.currentTicker === '') {
        console.log('No current ticker!');
        this.currentTicker = data[0].ticker;
        console.log('Ticker set to %s', this.currentTicker);
      } else {
        let found = false;
        for (const d of data) {
          if (d.ticker === this.currentTicker) {
            console.log('Ticker found. continuing');
            found = true;
            break;
          }
        }
        if (!found) {
          console.log('Ticker not found! setting default ticker');
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
