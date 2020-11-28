import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {StockService} from '../../shared/services/stock.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PortfolioService} from '../../shared/services/portfolio.service';
import {Router} from '@angular/router';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  addStockFormGroup: FormGroup;
  deleteStockFormGroup: FormGroup;

  portfolioHeader = ['Name', 'Ticker', 'High', 'Low', 'Open', 'Close'];

  public currentStockId = 1;

  constructor(
    private stockService: StockService,
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder,
    private router: Router,
    ) {}

  ngOnInit() {
    this.portfolioService.getPortfolio();
    this.stockService.getAllTickers();

    this.addStockFormGroup = this.formBuilder.group({
      tickerCtrl: ['', Validators.required]
    });
    this.deleteStockFormGroup = this.formBuilder.group({
      tickerCtrl: ['', Validators.required]
    });

    const speedCanvas = document.getElementById('speedChart');

    const dataFirst = {
      data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
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
  }


  getPortfolio() {
    return this.portfolioService.portfolio$;
  }

  goToStocks(ticker: string) {
    console.log('goToStocks(%s)', ticker);
    this.portfolioService.currentTicker = ticker;

    this.router.navigateByUrl('/stock');
  }

  addStock() {
    const ticker = this.addStockFormGroup.get('tickerCtrl').value;
    console.log('Adding %s', ticker);
    this.portfolioService.addStock(ticker);
  }

  removeStock() {
    const ticker = this.deleteStockFormGroup.get('tickerCtrl').value;
    console.log('Removing %s', ticker);
    this.portfolioService.removeStock(ticker);
  }
}
