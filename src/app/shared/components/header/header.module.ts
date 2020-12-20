import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/module/sharedModule';
import { HeaderComponent } from './header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    SharedModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports:[
    HeaderComponent, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatDialogModule,
  ]
})
export class HeaderModule { }
