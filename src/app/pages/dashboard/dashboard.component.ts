import { Component, OnInit } from '@angular/core';
import {StockService} from '../../shared/services/stock.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PortfolioService} from '../../shared/services/portfolio.service';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  addStockFormGroup: FormGroup;
  deleteStockFormGroup: FormGroup;

  updateNameFormGroup: FormGroup;

  updateDateFormGroup: FormGroup;

  portfolioHeader = ['Name', 'Ticker', 'High', 'Low', 'Open', 'Close'];

  constructor(
    private stockService: StockService,
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder,
    private router: Router,
    ) {}

  ngOnInit() {
    this.portfolioService.getPortfolio();
    this.portfolioService.getAllTickers();

    this.addStockFormGroup = this.formBuilder.group({
      tickerCtrl: ['', Validators.required]
    });
    this.deleteStockFormGroup = this.formBuilder.group({
      tickerCtrl: ['', Validators.required]
    });

    this.updateNameFormGroup = this.formBuilder.group({
      newName: ['', Validators.required]
    });

    this.updateDateFormGroup = this.formBuilder.group({
      date: ['', Validators.required]
    });
  }


  getPortfolio() {
    return this.portfolioService.portfolio$;
  }

  goToStocks(ticker: string) {
    console.log('goToStocks(%s)', ticker);
    this.portfolioService.currentTicker = ticker;
    this.router.navigateByUrl('/stock').then();
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

  rename() {
    const newName = this.updateNameFormGroup.get('newName').value;
    this.authService.renameUser(newName);
  }

  updateDate() {
    const newDate = this.updateDateFormGroup.get('date').value;
    console.log('New Date: %s', newDate);
    this.portfolioService.updatePortfolioDate(newDate);
  }
}
