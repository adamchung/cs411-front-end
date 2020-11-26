import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../shared/services/article.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PortfolioService} from '../../shared/services/portfolio.service';
import {StockService} from '../../shared/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  selectStockFormGroup: FormGroup;

  constructor(
    private articleService: ArticleService,
    private portfolioService: PortfolioService,
    private stockService: StockService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.portfolioService.getPortfolio();
    this.articleService.getArticles();

    this.selectStockFormGroup = this.formBuilder.group({
      tickerCtrl: ['', Validators.required],
    });

    if (this.portfolioService.currentTicker) {
      this.selectStockFormGroup.setValue({'tickerCtrl': this.portfolioService.currentTicker});
      this.stockService.getStockInfo();
    }
  }

  getPortfolio() {
    return this.portfolioService.portfolio$;
  }

  getArticles() {
    return this.articleService.article$;
  }

}
