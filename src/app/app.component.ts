import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalDataService } from  '@shared/services/globalData';
import { Subscription } from 'rxjs';

/**
 * Componente principal de la aplicacion
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  
  /**
   * Variable que permite manejar si se muestra o no el Spinner (Loading)
   */
  public showSpinner:boolean = false;

  /**
   * Variable que permite manejar las suscripciones a observables para el Spinner
   */
  private subscriptionSpinner: Subscription;

  /**
   * constructor
   * @param _globalDataService instancia a la clase globalDataService para acceder a recursos globales de la aplicación
   */
  constructor(private _globalDataService:GlobalDataService){}

  /**
   * Init
   */
  ngOnInit(): void {
    this.subscribes();
  }

  /**
   * Metodo que permite manejar las suscripciones del componente Spinner
   */
  subscribes(): void{
    this.subscriptionSpinner = this._globalDataService.getData('spinner').subscribe(data => {
      if(data != null){
        this.showSpinner = data;
      }
    }); 
  }

  /**
   * Cuando se destruya el componente realiza el unsubscribe de los eventos para optimizar el rendimiento de la aplicación
   */
  ngOnDestroy() {
    this.subscriptionSpinner.unsubscribe();
  }

}
