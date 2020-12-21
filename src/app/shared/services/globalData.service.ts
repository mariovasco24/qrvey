import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

/**
 * Classe que permite manejar datos por medio de suscripciones de forma global en la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  /**
   * Array que permite gudar los datos recibidos
   */
  private dataSubject = [];
  
  /**
   * Dato recibido
   */
  private data: any;

  /**
   * Identificador
   */
  private key;

  /**
   * Permite obtener el valor actualizado de un dato especifico
   * @param key Identificador
   * @returns Observable
   */
  getData(key): Observable<any> { 
    this.key = key;
    if(!this.dataSubject[key]){
      this.dataSubject[key] = new BehaviorSubject(null);
    }
    return this.dataSubject[key].asObservable(); 
  }
  
  /**
   * Permite actualizar el valor de una posicion especifica del array dataSubject
   * @param key Identificador
   */
  private refreshData(key):void {    
    if(!this.dataSubject[key]){
      this.dataSubject[key] = new BehaviorSubject(null);
    } 
    this.dataSubject[key].next(this.data); 
  }

  /**
   * Permite setear o modificar un valor en el array dataSubject
   * @param key Identificador
   * @param data Dato a guardar
   */
  setData(key,data: any):void {
    this.data = data;
    this.refreshData(key);
  }

}