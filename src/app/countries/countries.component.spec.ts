import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesComponent } from './countries.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;

  
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule ], 
    providers: [MatSnackBar]
  }));

  it(`should order the continents`, () => {
    const fixture = TestBed.createComponent(CountriesComponent);
    const app = fixture.componentInstance;

    const results = app.regionOrderName([{region:'Oceania'},{region:'Europe'},{region:'Americas'},{region:'Africa'},{region:'Asia'}],'asc')

    expect(results[0]["region"]).toEqual('Africa');
    expect(results[1]["region"]).toEqual('Americas');
    expect(results[2]["region"]).toEqual('Asia');
    expect(results[3]["region"]).toEqual('Europe');
    expect(results[4]["region"]).toEqual('Oceania');
  });


});
