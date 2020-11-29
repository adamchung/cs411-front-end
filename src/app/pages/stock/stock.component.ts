import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../shared/services/article.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PortfolioService} from '../../shared/services/portfolio.service';
import {StockService} from '../../shared/services/stock.service';
import Chart from 'chart.js';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  now: Date;

  // Stock Form
  selectStockFormGroup: FormGroup;

  constructor(
    private articleService: ArticleService,
    private portfolioService: PortfolioService,
    private stockService: StockService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    // Fetching Data
    this.portfolioService.getPortfolio();
    this.articleService.getArticles();

    // Initializing Forms
    this.selectStockFormGroup = this.formBuilder.group({
      tickerCtrl: ['', Validators.required],
    });

    // Getting current time
    this.now = new Date();

    // Initializing stock selection
    console.log('StockComponent ngOnInit Ticker: %s', this.portfolioService.currentTicker);
    if (this.portfolioService.currentTicker) {
      this.selectStockFormGroup.setValue({'tickerCtrl': this.portfolioService.currentTicker});
      this.portfolioService.getStockInfo();
    }

    // this.getStockInfo();
  }

  getPortfolio() {
    return this.portfolioService.portfolio$;
  }

  getArticles() {
    return this.articleService.article$;
  }

  getStockInfo() {
    this.stockService.stockInfo$.subscribe(
      (data) => {
        if (data !== null) {
          console.log('Data is not null now!');
          this.makeChart();
        } else {
          console.log('Data is still null');
        }
      }
    );
  }

  makeChart() {
    console.log('MakeChart Called!');
    const speedCanvas = document.getElementById('chart');

    const dataFirst = {
      data: [0, 10, 14, 15, 30, 35, 45, 55, 60, 54, 45, 30],
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    const dataSecond = {
      data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    const speedData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [dataFirst, dataSecond]
    };

    const chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    const lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });

    return true;
  }

}
