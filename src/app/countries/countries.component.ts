import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountryDetailComponent } from '../country-detail/country-detail.component';
import { GlobalDataService } from  '@shared/services/globalData';
import { GeneralService } from '@shared/services/generalServices';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [GeneralService]
})
export class CountriesComponent implements OnInit {
  public dataResultApiBackup: any[];
  public continentsGroup: any[];
  public countryFilter: string = '';

  constructor(private _generalService: GeneralService, public dialog: MatDialog, private _globalDataService:GlobalDataService) { }

  ngOnInit(): void {
    this.countriesLoad();
    this.subscribes();
  }

  subscribes(): void {
    this._globalDataService.getData('search').subscribe(data => {
      if(data != null){
        this.countryFilter = data;
        this.countriesFilter();
      }
    }); 
  }

  countriesLoad(): void {
    this._generalService.get('AllCountries').subscribe(
      result => {
        this.continentsGroup = this.countriesGroup(result);
        this.dataResultApiBackup = result;
      },
      error =>{
        
      }
    ); 
  }

  countriesGroup(result): object[] {
    let continents = []; 
    let dataArray = [];
    
    for(var i in result){
      if(!continents[result[i].region]){
        continents[result[i].region] = [];
      }
      continents[result[i].region].push(result[i]);
    }
    for(var i in continents){
      dataArray.push({region:(continents[i][0].region)?continents[i][0].region:'Without Region', countries:continents[i]});
    }

    dataArray = this.regionOrderName(dataArray,'asc');
    
    return dataArray;
  }

  regionOrderName(array, type): object[] {
    if(type === 'asc'){
      return array.sort((a,b) => (a.region > b.region) ? 1 : ((b.region > a.region) ? -1 : 0));
    }
    return array.reverse((a,b) => (a.region > b.region) ? 1 : ((b.region > a.region) ? -1 : 0));
  }

  countriesFilter(): void {
    let dataArray = this.dataResultApiBackup;
    if(this.countryFilter != ''){
      dataArray = dataArray.filter(data => data.name.toLowerCase().includes(this.countryFilter.toLowerCase()));
    }
    this.continentsGroup = this.countriesGroup(dataArray);
  }

  showCountryDetail(country: object): void {
    this.dialog.open(CountryDetailComponent, {
      width: '550px',
      data: {country: country, dataResultApiBackup: this.dataResultApiBackup}
    });
  }

}
