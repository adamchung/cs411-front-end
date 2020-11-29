import { Component, OnInit } from '@angular/core';
import {StockService} from '../../shared/services/stock.service';
import Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(
    private stockService: StockService,
  ) { }

  ngOnInit(): void {
    // console.log('Chart ngOnInit!!');

    this.makeChart();
  }

  makeChart() {
    // console.log('MakeChart called')
    const canvas = document.getElementById('chart');

    const chartData = this.stockService.makeChartData();
    // console.log(chartData);
    const highData = chartData.high;
    const lowData = chartData.low;
    const openData = chartData.open;
    const closeData = chartData.close;
    const labelsData = chartData.labels;

    const labelsString: string[] = [];
    for (const l of labelsData) {
      labelsString.push(l.toLocaleDateString());
    }

    const high = {
      label: 'High',
      data: highData,
      fill: false,
      borderColor: '#69ee53',
      backgroundColor: 'transparent',
      pointBorderColor: '#69ee53',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    const low = {
      label: 'Low',
      data: lowData,
      fill: false,
      borderColor: '#ee5353',
      backgroundColor: 'transparent',
      pointBorderColor: '#ee5353',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    const open = {
      label: 'Open',
      data: openData,
      fill: false,
      borderColor: '#76bfe7',
      backgroundColor: 'transparent',
      pointBorderColor: '#76bfe7',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    const close = {
      label: 'Close',
      data: closeData,
      fill: false,
      borderColor: '#304e5e',
      backgroundColor: 'transparent',
      pointBorderColor: '#304e5e',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    const data = {
      labels: labelsString,
      datasets: [high, low, open, close],
    };

    const chartOptions = {
      legend: {
        display: true,
        position: 'bottom'
      }
    };

    const lineChart = new Chart(canvas, {
      type: 'line',
      hover: true,
      data: data,
      options: chartOptions,
    });
  }

}
