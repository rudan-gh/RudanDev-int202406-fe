import { Injectable } from '@angular/core';
import { DataPointModel } from '../models/dataPoint.model';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  // API URL za dohvat podataka
  private apiUrl = 'http://localhost:5035/readings';

  constructor(private httpClient: HttpClient) {
  }

  async getData() {
    //Dohvat podataka preko definiranog API URL-a pomoću HTTP GET zahtjeva
    return await lastValueFrom(this.httpClient.get<DataPointModel[]>(this.apiUrl));
  }

  getMeasurementUnit(): string {
    return 'kWh';
  }

  getSeriesColors(): Array<string> {
    return ['#CC0000', '#660000', '#FF6600', '#FFCC66', '#A52A2A', '#FF00FF'];
  }

  getTitleText(): string {
    return 'Analiza podataka za razdoblje  01.06.2024-01.06.2024';
  }

}
