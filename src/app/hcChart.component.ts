// @ts-nocheck
import { Component, ViewChild } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';
import { MockDataService } from './data/mockData.service';
import { DataPointModel } from './models/dataPoint.model';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'hcChart',
  templateUrl: 'hcChart.template.html',
})
export class hcChartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  // Referenca na komponentu
  @ViewChild(HighchartsChartComponent) private highchart: HighchartsChartComponent;

  // Definiranje zona -> ako je isExtrapolated true onda je točka prikazana plavom bojom (zona)
  private zones = [
    {
      value: 0.9,
      color: '#FF0000'
    },
    {
      value: 1.1,
      color: '#1E90FF'
    },
    {
      color: '#FF0000'
    },
  ];

  constructor(private mockDataService: MockDataService) {
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
        // Event koji se izvršava nakon što se graf učita. Kada se događaj pokrene, poziva se asinkrona metoda za dohvat podataka, a zatim se poziva metoda koja dodaje novi prikaz u već postojeći graf.
        events: {
          load: (e) => {
            mockDataService.getData().then(data => {
                this.AddNewSeriesToChart('KAMP EL1865', data);
              });
          }},
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
        // Automatski prilagodba x-osi nakon dodavanja novog prikaza na graf
        startOnTick: false,
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
      // series: [{
      //   name: 'KAMP EL1865',
      //   data: mockDataService.getData(),
      // }],
      tooltip: {
        crosshairs: {
          color: '#4F4F4F',
          dashStyle: 'ShortDash',
        },
        shared: true,
        valueSuffix: ' ' + mockDataService.getMeasurementUnit(),
      },
      // Prikazivanje podataka u vremenskoj zoni korisnika
      time: {
        useUTC: false
      },
    };

    console.log('chart: ', this.chartOptions);
  }

  //Metoda koja dodaje novi prikaz na postojeći graf
  private AddNewSeriesToChart(title: string, data: DataPointModel[]): [] {
    this.highchart.chart.addSeries({
      name: title,
      data: this.PrepareDataForSeries(data),
      zones: this.zones,
      zoneAxis: 'isExtrapolatedIntValue',
      tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>Is extrapolated: {point.isExtrapolated}'
      }
    }, true);
  }

  //Metoda koja priprema podatke za dodavanje na graf
  private PrepareDataForSeries(data: DataPointModel[]): [] {
    return data.map(item => ({
      x: item.timestamp,
      y: item.value,
      isExtrapolatedIntValue: item.isExtrapolated ? 1 : 0,
      isExtrapolated: item.isExtrapolated
    }));
  }
};
