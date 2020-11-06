import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Futurama} from '../models/futurama';
import {StockInfo} from '../models/stock-info';
import {StockPrice} from '../models/stock-price';
import {sample} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private stocksSubject = new BehaviorSubject<StockInfo[]>(null)
  public stocks$: Observable<StockInfo[]> = this.stocksSubject.asObservable();

  private stockPriceSubject = new BehaviorSubject<StockPrice[]>(null)
  public stockPrice$: Observable<StockPrice[]> = this.stockPriceSubject.asObservable();

  constructor() {
    // test data
    const sampleStock = [{
      id: 0,
      ticker: 'AAPL',
      marketCap: '1.8T',
      corporateName: 'Apple',
    }, {
      id: 1,
      ticker: 'GOOG',
      marketCap: '1.6T',
      corporateName: 'Alphabet',
    }];

    this.stocksSubject.next(sampleStock);

    const samplePrice = [new StockPrice({
      id: 0,
      ticker: 'AAPL',
      volume: '100',
      low: '90',
      high: '110',
      open: '102',
      close: '98',
      date: '2020-01-15T06:03:00.000+00:00'
    }), new StockPrice({
      id: 1,
      ticker: 'GOOG',
      volume: '100',
      low: '90',
      high: '110',
      open: '102',
      close: '98',
      date: '2020-02-16T06:03:00.000+00:00'
    })];

    this.stockPriceSubject.next(samplePrice);

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

  getPrice(id: number) {
    const subject = this.stockPriceSubject.getValue();

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
}
