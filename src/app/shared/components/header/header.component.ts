import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from  '@shared/services/globalData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  public countryFilter:string = '';

  constructor(private _globalDataService:GlobalDataService) { }

  ngOnInit(): void {
  }

  countriesFilter(){
    this._globalDataService.setData("search",this.countryFilter);
  }

}
