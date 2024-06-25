// @ts-nocheck
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MockDataService } from './data/mockData.service';

@Component({
  selector: 'hcChart',
  templateUrl: 'hcChart.template.html',
})
export class hcChartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(mockDataService: MockDataService) {
    this.chartOptions = {
      chart: {
        type: 'spline',
        zoomType: 'x',
        marginTop: 50,
        marginBottom: 140,
        resetZoomButton: {
          position: {
            x: -10,
            y: 10,
          },
          relativeTo: 'plot',
          theme: {
            style: {
              color: '#808080',
              fontWeight: 'bold',
            },
          },
        },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: mockDataService.getTitleText(),
        x: -20,
      },
      subtitle: {
        useHTML: true,
        floating: true,
        align: 'center',
        x: -50,
        verticalAlign: 'bottom',
        y: -65,
        style: {
          fontFamily: 'arial',
          fontSize: '14px',
        },
      },
      colors: mockDataService.getSeriesColors(),
      plotOptions: {
        series: {
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 3,
          },
          turboThreshold: 5000,
          connectNulls: false,
        },
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: '',
        },
        startOnTick: true,
        tickInterval: 3600000,
        showFirstLabel: false,
        showLastLabel: false,
        dateTimeLabelFormats: {
          day: '<b>%e. %B</b>',
          week: '%e. %b',
          month: '%B %y',
          year: '%Y',
        },
      },
      yAxis: {
        title: {
          text: '<b>[' + mockDataService.getMeasurementUnit() + ']</b>',
        },
        startOnTick: false,
        min: -6.9124,
      },
      series: [
        {
          name: 'KAMP EL1865',
          data: mockDataService.getData(),
        }
      ],
      tooltip: {
        crosshairs: {
          color: '#4F4F4F',
          dashStyle: 'ShortDash',
        },
        shared: true,
        valueSuffix: ' ' + mockDataService.getMeasurementUnit(),
      },
    };

    console.log('chart: ', this.chartOptions);
  }
}
