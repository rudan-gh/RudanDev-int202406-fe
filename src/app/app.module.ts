import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { hcChartComponent } from './hcChart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MockDataService } from './data/mockData.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule,
  ],
  declarations: [hcChartComponent],
  bootstrap: [hcChartComponent],
  providers: [MockDataService],
})
export class AppModule {}
