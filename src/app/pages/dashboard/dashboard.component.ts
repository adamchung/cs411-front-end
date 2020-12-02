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

  // dates for calendar
  today: Date;
  maxDate: Date;
  minDate: Date;

  constructor(
    private stockService: StockService,
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder,
    private router: Router,
    ) {
    this.today = new Date();
    this.maxDate = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getHours() > 17 ? this.today.getDate() : this.today.getDate() - 1
    );
    this.minDate = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate() - 30
    );
    console.log(this.maxDate);
    console.log(this.minDate);
  }

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

  dateFilter = (d: Date): boolean => {
    if (d === null) {
      return false;
    }

    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    if (day === 0 || day === 6) {
      return false;
    }

    if (d.getFullYear() === 2020 && d.getMonth() === 10 && d.getDate() === 26) {
      return false;
    }

    return true;
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
    console.log(newDate);
    this.portfolioService.updatePortfolioDate(newDate);
  }
}
