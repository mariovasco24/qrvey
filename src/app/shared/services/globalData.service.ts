import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  private dataSubject = [];
  private data: any;
  private key;

  constructor() { }

  getData(key): Observable<any> { 
    this.key = key;
    if(!this.dataSubject[key]){
      this.dataSubject[key] = new BehaviorSubject(null);
    }
    return this.dataSubject[key].asObservable(); 
  }
  
  private refreshData(key):void {    
    if(!this.dataSubject[key]){
      this.dataSubject[key] = new BehaviorSubject(null);
    } 
    this.dataSubject[key].next(this.data); 
  }

  setData(key,data: any):void {
    this.data = data;
    this.refreshData(key);
  }

}