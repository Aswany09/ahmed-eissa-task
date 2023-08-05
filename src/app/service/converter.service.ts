import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  // private apiUrl = 'https://data.fixer.io/api/?access_key=a488d0f26e11497796b894e17fb58b81';
  private apiUrl = 'http://data.fixer.io/api/latest?access_key=794b47359a8d6bb45bcca93e6620f05b&format=1';

  constructor(private http: HttpClient) { }

  convertExchange(): Observable<any> {

    return this.http.get<any>(this.apiUrl);
  }

  getLatestRate(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getHistorical(){

  }

}
