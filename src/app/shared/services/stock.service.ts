import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Portfolio} from '../models/portfolio';
import {StockInfo} from '../models/stock-info';
import {PortfolioService} from './portfolio.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private stockInfoSubject = new BehaviorSubject<StockInfo>(null);
  public stockInfo$: Observable<StockInfo> = this.stockInfoSubject.asObservable();

  private chartDataSubject = new BehaviorSubject<any>(null);
  public chartData$: Observable<any> = this.chartDataSubject.asObservable();

  private relatedStocksSubject = new BehaviorSubject<string[]>(null);
  public relatedStocks$: Observable<string[]> = this.relatedStocksSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  getStockInfo(ticker: string) {
    // console.log('getStockInfo(%s)', ticker);
    if (!ticker) {
      // console.log('No current ticker!');
      this.stockInfoSubject.next(null);
      return;
    }

    if (this.stockInfoSubject.getValue() !== null
      && this.stockInfoSubject.getValue().ticker === ticker) {
      // console.log('Data already loaded');
      return;
    }

    this.stockInfoSubject.next(null);

    this.getRelatedStocks(ticker);

    const url = `${environment.apiUrl}/stocks/${ticker}`;
    // console.log('Request to %s', url);
    return this.http.get<StockInfo>(url).subscribe(
      (data) => {
        if (data) {
          // console.log('getStockInfo Response');
          // console.log(data);
          this.stockInfoSubject.next(new StockInfo(data));
          // console.log('Data set.');
          // console.log(this.stockInfoSubject.getValue());
          // console.log('Making chart data');
        }
      }
    );
  }

  getRelatedStocks(ticker: string) {
    if (!ticker) {
      // console.log('No current ticker!');
      this.relatedStocksSubject.next(null);
      return;
    }

    this.relatedStocksSubject.next(null);

    const url = `${environment.apiUrl}/stocks/${ticker}/related`;

    return this.http.get<string[]>(url).subscribe(
      (data) => {
        this.relatedStocksSubject.next(data);
      }
    );
  }

  makeChartData() {
    // console.log('makeChartData()');
    const rawData = this.stockInfoSubject.getValue();
    console.log(rawData);

    const high: number[] = [];
    const low: number[] = [];
    const open: number[] = [];
    const close: number[] = [];
    const labels: Date[] = [];

    for (const d of rawData.data) {
      high.push(d.high);
      low.push(d.low);
      open.push(d.open);
      close.push(d.close);
      labels.push(d.date);
    }

    return {
      high, low, open, close, labels
    };
  }
}
