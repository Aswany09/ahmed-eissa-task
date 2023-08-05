import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/converter',
    pathMatch: 'full'
  }, // Default route
  {
    path: 'converter',
    loadChildren: () => import('./currency/currency.module').then(m => m.CurrencyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
