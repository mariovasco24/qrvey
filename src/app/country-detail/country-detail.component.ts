import { Component, Inject, Input, OnInit } from '@angular/core';

/**
 * Este componente nos permite visualizar información detallada de un pais
 */
@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit{
  /**
   * Array obtenido de la peticion realizada al endpoint de paises
   */
  public dataResultApiBackup;

  /**
   * Objeto pais
   */
  public country;

  @Input() public name: string; 
  
  
  @Input() public flag: string;
  @Input() public region: string;
  @Input() public population: string;
  @Input() public capital: string;
  @Input() public currencies: string;
  @Input() public languages: string;
  @Input() public borders: string;

  @Input() public dataResultApi: string;
  @Input() public alpha3Code: string;
  /**
   * Recibe los parametros que son enviados desde la apertura del cuadro de dialogo
   * @param data objeto con la propiedad country y dataResultApiBackup (respuesta del llamado de la api)
   */
  constructor() { 
    /*this.country = data.country;
    this.dataResultApiBackup = data.dataResultApiBackup;*/
  } 

  ngOnInit():void{
    this.dataResultApiBackup = JSON.parse(this.dataResultApi);
    for(var i in this.dataResultApiBackup){
      if(this.dataResultApiBackup[i].alpha3Code == this.alpha3Code){
        this.country = this.dataResultApiBackup[i];
      }
    }
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
  saveFavorite(country): void{alert
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
  getFavoriteStatus(country): boolean{
    if(localStorage.getItem(country.alpha3Code) && localStorage.getItem(country.alpha3Code) === 'true'){
      return true;
    }
    return false;
  }

}
