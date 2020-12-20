import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [CountriesComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [
    CountriesComponent, 
    MatTooltipModule
  ]
})
export class CountriesModule { }
