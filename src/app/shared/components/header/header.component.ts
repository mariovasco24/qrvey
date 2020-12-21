import { Component } from '@angular/core';
import { GlobalDataService } from  '@shared/services/globalData';

/**
 * Clase que permite manejar la cabecera o header de la aplicación
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  /**
   * Variable que mantiene el texto ingresado por el usuario para el filtro de busqueda de pais
   */
  public countryFilter:string = '';

  /**
   * Constructor
   * @param _globalDataService instancia de la clase GlobalDataService
   */
  constructor(private _globalDataService:GlobalDataService) { }

  /**
   * Guarda el dato ingresado por el usuario para filtro de buqueda de paises con el fin que sea consumido por medio de suscripciones desde los componentes que lo requieran
   */
  countriesFilter(){
    this._globalDataService.setData("search",this.countryFilter);
  }

}
