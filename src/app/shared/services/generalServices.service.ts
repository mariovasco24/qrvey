import {Injectable} from "@angular/core";
import { HttpClient,HttpHeaders } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from "rxjs/operators";
import { GlobalDataService } from  '@shared/services/globalData';
import {RoutesServices} from "./routes";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class GeneralService {
  
  	constructor(private http:HttpClient, private _globalDataService:GlobalDataService, private _snackBar: MatSnackBar){}

    get(route: string, params?:any): Observable<any>{
      this._globalDataService.setData('spinner',true);
      let stringParams='';
      if(params != undefined){
        for(var i in params){
          stringParams+='/'+params[i];
        }
      }

      let rutasWS = new RoutesServices();
      let headers = new HttpHeaders({});		
     
      return this.http.get(rutasWS.urlWebService(route)+stringParams,{headers: headers}).pipe(
        map(res => {
          this._globalDataService.setData('spinner',false);
          return res;
        }),
        tap(res => {},
        err => {
          this._snackBar.open("Ha ocurrido un error al cargar la información, por favor contacte al administrador del sitio.", null, {
            duration: 5000,
          });
          this._globalDataService.setData('spinner',false);
        })
      )
    }
  
}