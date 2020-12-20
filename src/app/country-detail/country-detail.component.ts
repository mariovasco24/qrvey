import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent{
  private dataResultApiBackup;
  public country;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {country: object, dataResultApiBackup: object[]}) { 
    this.country = data.country;
    this.dataResultApiBackup = data.dataResultApiBackup;
  }

  getBorderCountryFullName(alpha3Code):string{
    return this.dataResultApiBackup.filter(data => data.alpha3Code == alpha3Code)[0].name;
  }

  saveFavorite(country): void{
    if(!country.favorite){
      country.favorite = true;
      localStorage.setItem(country.alpha3Code, 'true');
    }else{
      country.favorite = !country.favorite;
      localStorage.setItem(country.alpha3Code, 'false');
    }
  }

  getFavoriteStatus(country): string{
    if(localStorage.getItem(country.alpha3Code) && localStorage.getItem(country.alpha3Code) === 'true'){
      return 'favorite';
    }
    return 'favorite_border';
  }

}
