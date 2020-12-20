import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryDetailComponent } from './country-detail.component';
import { SharedModule } from '@shared/module/sharedModule';
import { MatCardModule} from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CountryDetailComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTooltipModule
  ],
  exports:[
    CountryDetailComponent, 
    SharedModule,
    MatCardModule,
    MatTooltipModule
  ]
})
export class CountryDetailModule { }
