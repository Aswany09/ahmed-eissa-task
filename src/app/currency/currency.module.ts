import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyContainerComponent } from './currency-container/currency-container.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
  {
    path: '',
    component:CurrencyContainerComponent
  }
];

@NgModule({
  declarations: [
    CurrencyContainerComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    NgxChartsModule,

  ]
})
export class CurrencyModule { }
