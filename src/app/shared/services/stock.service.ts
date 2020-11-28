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
  public stockInfo$ : Observable<StockInfo> = this.stockInfoSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  getStockInfo(ticker: string) {
    if (!ticker) {
      console.log('No current ticker!');
      this.stockInfoSubject.next(null);
      return;
    }

    if (this.stockInfoSubject.getValue() !== null
      && this.stockInfoSubject.getValue().ticker === ticker) {
      console.log('Data already loaded');
      return;
    }

    this.stockInfoSubject.next(null);

    const url = `${environment.apiUrl}/stocks/${ticker}`;

    return this.http.get<StockInfo>(url).subscribe(
      (data) => {
        if (data) {
          this.stockInfoSubject.next(new StockInfo(data));
          console.log(this.stockInfoSubject.getValue());
        }
      }
    );
  }

  getChartData() {
    const data = this.stockInfoSubject.getValue();

    const high: number[] = [];
    const low: number[] = [];
    const open: number[] = [];
    const close: number[] = [];
    const labels: Date[] = [];

    for (const d of data.data) {
      high.push(d.high);
      low.push(d.low);
      open.push(d.open);
      close.push(d.close);
      labels.push(d.date);
    }

    return {
      high,
      low,
      open,
      close,
      labels,
    };
  }
}
