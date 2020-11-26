import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Portfolio} from '../models/portfolio';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private portfolioSubject = new BehaviorSubject<Portfolio[]>(null);
  public portfolio$: Observable<Portfolio[]> = this.portfolioSubject.asObservable();

  public currentTicker: string;

  constructor(
    private http: HttpClient,
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

  addStock(ticker: string) {
    const url = `${environment.apiUrl}/portfolio/1/add?ticker=${ticker}`;

    this.http.get<Portfolio[]>(url).subscribe(
      (data) => {
        console.log(data);
        this.setPortfolioData(data);
      }
    );
  }

  removeStock(ticker: string) {
    const url = `${environment.apiUrl}/portfolio/1/delete?ticker=${ticker}`;

    this.http.get<Portfolio[]>(url).subscribe(
      (data) => {
        console.log(data);
        this.setPortfolioData(data);
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
