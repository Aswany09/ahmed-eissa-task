import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConverterService } from 'src/app/service/converter.service';

@Component({
  selector: 'app-currency-container',
  templateUrl: './currency-container.component.html',
  styleUrls: ['./currency-container.component.scss']
})
export class CurrencyContainerComponent {
  currencyForm!: FormGroup;

  currentState = currencyState.converter;
  currencyState = currencyState;

  LatestExchange$!: Observable<any>;
  latestExchangeData!: [];

  fromCurrencySelected!: never;
  toCurrencySelected!: never;
  convertedAmount: number = 0;

  historicalData: HistoricalData[] = [];
   colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  lineChartInstance: any;
  chartData!:any;


  constructor(private formBuilder: FormBuilder,
              public converterService:ConverterService) { }

  ngOnInit() {
    this.currencyForm = this.formBuilder.group({
      fromCurrency: ['USD'], // Default value for From Currency
      toCurrency: ['EUR'],   // Default value for To Currency
      amount: ['1',Validators.required],   // Default value for amount
    });


    this.LatestExchange$ = this.converterService.getLatestRate();
    // Subscribe to LatestExchange$
    this.LatestExchange$.subscribe(latestExchange => {
      this.latestExchangeData = latestExchange.rates;
      this.fromCurrencySelected = this.latestExchangeData[this.currencyForm.value.fromCurrency];
      this.toCurrencySelected = this.latestExchangeData[this.currencyForm.value.toCurrency];
    });


    // Subscribe to valueChanges of both form controls
    this.currencyForm.get('fromCurrency')?.valueChanges.subscribe((res) => {
      this.fromCurrencySelected = this.latestExchangeData[res];
    });
    this.currencyForm.get('toCurrency')?.valueChanges.subscribe((res) => {
      this.toCurrencySelected = this.latestExchangeData[res];
    });

  }


  onSubmit() {

    if (!this.currencyForm?.valid) return;

    // Get the amount to convert from the user input
    let amountToConvert = this.currencyForm.value.amount;

    // Perform the currency conversion
    this.convertedAmount = amountToConvert * (this.toCurrencySelected / this.fromCurrencySelected);

    // Update the chart data with the new currency value and date
    const currentDate = new Date();
    const historicalRate: HistoricalData = {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      value: this.convertedAmount
    };
    this.historicalData.push(historicalRate);

    // Update the chart with historical data
    this.updateChart();
  }


  private updateChart() {
    if (this.lineChartInstance && this.historicalData.length > 0) {
      // Sort the historical data by date in ascending order
      this.historicalData.sort((a, b) => a.date.getTime() - b.date.getTime());

      // Extract the labels (months) and values (rates) for the chart
      const labels = this.historicalData.map(entry => entry.date.toLocaleString('default', { month: 'long' }));
      const values = this.historicalData.map(entry => entry.value);

      // Update the chart data
      this.chartData = [
        {
          name: 'Currency Value',
          series: labels.map((label, index) => ({ name: label, value: values[index] }))
        }
      ];

      // Redraw the chart
      this.lineChartInstance.update();
    }
  }


}

export enum currencyState {
  converter = 1,
  details = 2
}

export interface HistoricalData {
  date: Date;
  value: number;
}