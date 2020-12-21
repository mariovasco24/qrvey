import {Injectable} from "@angular/core";
import { HttpClient,HttpHeaders } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from "rxjs/operators";
import { GlobalDataService } from  '@shared/services/globalData';
import {RoutesServices} from "./routes";
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Clase que permite compartir servicios de forma global en la aplicacion
 */
@Injectable()
export class GeneralService {
    /**
     * Constructor
     * @param http Instancia de la clase HttpClient
     * @param globalDataService Instancia de la clase GlobalDataService
     * @param snackBar Instancia de la clase MatSnackBar de angular material
     */  
  	constructor(private http:HttpClient, private globalDataService:GlobalDataService, private snackBar: MatSnackBar){}

    /**
     * Metodo global que realiza una peticion GET al endpoint
     * @param route Ruta que especifica que endpoint consumir
     * @param params Parametros adicionales que se desean enviar en el GET
     * @returns Retorna un Observable
     */
    async get(route: string, params?:any): Promise<Observable<any>>{
      this.globalDataService.setData('spinner',true);
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
          this.globalDataService.setData('spinner',false);
          return res;
        }),
        tap(res => {},
        err => {
          this.snackBar.open("Ha ocurrido un error al cargar la información, por favor contacte al administrador del sitio.", null, {
            duration: 5000,
          });
          this.globalDataService.setData('spinner',false);
        })
      )
    }
  
}