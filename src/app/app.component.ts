import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from  '@shared/services/globalData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  public title:string = 'QrveyTest';
  public showSpinner:boolean = false;

  constructor(private _globalDataService:GlobalDataService){}

  ngOnInit(): void {
    this.subscribes();
  }

  subscribes(): void{
    this._globalDataService.getData('spinner').subscribe(data => {
      if(data != null){
        this.showSpinner = data;
      }
    }); 
  }


}
