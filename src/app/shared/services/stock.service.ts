import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Futurama} from '../models/futurama';
import {StockInfo} from '../models/stock-info';
import {StockPrice} from '../models/stock-price';
import {sample} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tick} from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private stocksSubject = new BehaviorSubject<StockInfo[]>(null)
  public stocks$: Observable<StockInfo[]> = this.stocksSubject.asObservable();

  private stockPriceSubject = new BehaviorSubject<StockPrice[]>([])
  public stockPrice$: Observable<StockPrice[]> = this.stockPriceSubject.asObservable();

  private stockGroupId;

  constructor(
    private http: HttpClient,
  ) {
    // test data
    // const sampleStock = [{
    //   id: 0,
    //   ticker: 'AAPL',
    //   marketCap: '1.8T',
    //   corporateName: 'Apple',
    // }, {
    //   id: 1,
    //   ticker: 'GOOG',
    //   marketCap: '1.6T',
    //   corporateName: 'Alphabet',
    // }];
    //
    // this.stocksSubject.next(sampleStock);
    //
    // const samplePrice = [new StockPrice({
    //   id: 0,
    //   ticker: 'AAPL',
    //   volume: '100',
    //   low: '90',
    //   high: '110',
    //   open: '102',
    //   close: '98',
    //   date: '2020-01-15T06:03:00.000+00:00'
    // }), new StockPrice({
    //   id: 1,
    //   ticker: 'GOOG',
    //   volume: '100',
    //   low: '90',
    //   high: '110',
    //   open: '102',
    //   close: '98',
    //   date: '2020-02-16T06:03:00.000+00:00'
    // })];

    // this.stockPriceSubject.next(samplePrice);

  }

  getStockGroup() {
    const url = 'http://localhost:8080/stockGroup';

    return this.http.get<any>(url).subscribe(
      (data) => {
        console.log('Setting group id to %d', data[0].id);
        this.stockGroupId = data[0].id;
        this.stocksSubject.next(data[0].openStockInfos);
        console.log(this.stocksSubject.getValue());

        for (const stock of this.stocksSubject.getValue()) {
          this.getStockPrice(stock.ticker);
        }
      }
    );
  }

  getStockPrice(ticker: string) {
    console.log('getStockprice');
    for (const price of this.stockPriceSubject.getValue()) {
      if (price.ticker === ticker) {
        return;
      }
    }

    const url = `http://localhost:8080/stockprice/${ticker}`;

    return this.http.get<any>(url).subscribe(
      (data) => {
        const arr = this.stockPriceSubject.getValue();
        arr.push(data[0]);
        this.stockPriceSubject.next(arr);
        console.log(this.stockPriceSubject.getValue());
      }
    );
  }

  removeStockGroup(ticker: string) {
    const url = `http://localhost:8080/deleteStock?id=${this.stockGroupId}&ticker=${ticker}`
    console.log('Removing %s', ticker);
    console.log(url);

    return this.http.get<any>(url).subscribe(
      (data) => {
        this.stocksSubject.next(null);
        this.getStockGroup();
      }
    );
  };

  addStock(ticker: string) {
    const url = `http://localhost:8080/addToStockGroup/${this.stockGroupId}?ticker=${ticker}`;

    return this.http.get<any>(url).subscribe(
      () => {
        this.stocksSubject.next(null);
        this.getStockGroup();
      }
    );
  }

  getInfo(id: number) {
    const subject = this.stocksSubject.getValue();

    if (!subject) {
      return null;
    }

    for (const info of subject) {
      if (info.id === id) {
        return info;
      }
    }

    return null;
  }

  getPrice(ticker: string) {
    const subject = this.stockPriceSubject.getValue();

    if (!subject) {
      return null;
    }

    for (const info of subject) {
      if (info.ticker === ticker) {
        return info;
      }
    }

    return null;
  }
}
