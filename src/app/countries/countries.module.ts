import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CountryDetailComponent } from '../country-detail/country-detail.component';
@NgModule({
  declarations: [CountriesComponent, CountryDetailComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [
    CountriesComponent, 
    MatTooltipModule,
  ]
})
export class CountriesModule { }
