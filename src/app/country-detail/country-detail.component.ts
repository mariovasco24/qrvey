import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Este componente nos permite visualizar información detallada de un pais
 */
@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent{
  /**
   * Array obtenido de la peticion realizada al endpoint de paises
   */
  public dataResultApiBackup;

  /**
   * Objeto pais
   */
  public country;

  /**
   * Recibe los parametros que son enviados desde la apertura del cuadro de dialogo
   * @param data objeto con la propiedad country y dataResultApiBackup (respuesta del llamado de la api)
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: {country: object, dataResultApiBackup: object[]}) { 
    this.country = data.country;
    this.dataResultApiBackup = data.dataResultApiBackup;
  }

  /**
   * Obtiene el nombre completo de la frontera
   * @param alpha3Code Codigo de identificador del pais (alpha3)
   * @returns Nombre completo del pais fronterizo
   */
  getBorderCountryFullName(alpha3Code: string): string {
    return this.dataResultApiBackup.filter(data => data.alpha3Code == alpha3Code)[0].name;
  }

  /**
   * Guarda en storage el pais seleccionado como favorito
   * @param country Objeto pais del que se quiere guardar en favorito
   */  
  saveFavorite(country): void{
    if(!country.favorite){
      country.favorite = true;
      localStorage.setItem(country.alpha3Code, 'true');
    }else{
      country.favorite = !country.favorite;
      localStorage.setItem(country.alpha3Code, 'false');
    }
  }

  /**
   * Valida si el pais seleccionado se encuentra registrado como favorito
   * @param country Objeto pais del que se quiere validar si se encuentra como favorito
   * @returns Nombre del icono que representa si el país se encuentra marcado como favorito o no
   */
  getFavoriteStatus(country): string{
    if(localStorage.getItem(country.alpha3Code) && localStorage.getItem(country.alpha3Code) === 'true'){
      return 'favorite';
    }
    return 'favorite_border';
  }

}
