import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataService } from  '@shared/services/globalData';
import { GeneralService } from '@shared/services/generalServices';
import { Subscription } from 'rxjs';
import { DATA } from '@shared/services/constantsService';

/**
 * Componente pais maneja y administra el listado de los paises obtenidos por medio del llamado al endpoint de paises
 */
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  providers: [GeneralService]
})
export class CountriesComponent implements OnInit, OnDestroy {
  /**
   * Variable que mantiene un backup del resultado obtenido al llamar al endpoint paises
   */
  public dataResultApiBackup: any[];

  /**
   * Variable que mantiene los paises agrupados por continentes
   */
  public continentsGroup: any[];

  /**
   * Variable que mantiene el texto ingresado por el usuario para el filtro de busqueda de pais
   */
  public countryFilter: string = '';

  /**
   * Variable que permite manejar las suscripcion del campo busqueda
   */
  private subscriptionSearch: Subscription;

  /**
   * Variable que permite manejar las suscripcion al llamado http del endpoint (paises)
   */
  private subscriptionGetCountries: Subscription;

  public selectedCountry:object = {name:'', languages: [], borders:[]};

  public showModal = false;

  /**
   * Constructor
   * @param _generalService Instancia a la clase global generalService
   * @param dialog Instancia a la clase dialog de angular material
   * @param _globalDataService Instancia a la clase GlobalDataService
   */
  constructor(private _generalService: GeneralService, public dialog: MatDialog, private _globalDataService:GlobalDataService) { }

  /**
   * Init
   */
  ngOnInit(): void {
    this.countriesLoad();
    this.subscribes();
  }

  /**
   * Permite manejar las suscripciones del componente
   */
  subscribes(): void {
    this.subscriptionSearch = this._globalDataService.getData('search').subscribe(data => {
      if(data != null){
        this.countryFilter = data;
        this.countriesFilter();
      }
    }); 
  }

  /**
   * Realiza el llamado al endpoint obteniendo el listado de paises
   */
  async countriesLoad(): Promise<void> {
    this.subscriptionGetCountries = (await this._generalService.get(DATA.AllCountries)).subscribe(
      result => {
        this.continentsGroup = this.countriesGroup(result);
        this.dataResultApiBackup = result;
      }
    ); 
  }

  /**
   * Cuando se destruya el componente realiza el unsubscribe de los eventos para optimizar el rendimiento de la aplicación
   */
  ngOnDestroy() {
    this.subscriptionSearch.unsubscribe();
    this.subscriptionGetCountries.unsubscribe();
  }

  /**
   * Agrupa los datos de paises por continentes
   * @param result array obtenido del llamado al endpoint de paises
   */
  countriesGroup(result): object[] {
    let continents = []; 
    let dataArray = [];
    
    for(var i in result){
      if(!continents[result[i].region]){
        continents[result[i].region] = [];
      }
      continents[result[i].region].push(result[i]);
    }
    for(var i in continents){
      dataArray.push({region:(continents[i][0].region)?continents[i][0].region:'Without Region', countries:continents[i]});
    }

    dataArray = this.regionOrderName(dataArray,'asc');
    
    return dataArray;
  }

  /**
   * Ordena un array de forma ascendente o descendente
   * @param array array a ordenar
   * @param type si se quiere ordenar de forma ascendente su valor debe ser 'asc' o si es de forma descendente 'desc'
   */
  regionOrderName(array, type): object[] {
    if(type === 'asc'){
      return array.sort((a,b) => (a.region > b.region) ? 1 : ((b.region > a.region) ? -1 : 0));
    }
    return array.reverse((a,b) => (a.region > b.region) ? 1 : ((b.region > a.region) ? -1 : 0));
  }

  /**
   * Permite realiar una busqueda de paises, no es sencible a mayúsculas o minúsculas
   */
  countriesFilter(): void {
    let dataArray = this.dataResultApiBackup;
    if(this.countryFilter != ''){
      dataArray = dataArray.filter(data => data.name.toLowerCase().includes(this.countryFilter.toLowerCase()));
    }
    this.continentsGroup = this.countriesGroup(dataArray);
  }

  /**
   * Permite visualizar en un cuadro modal  información detallada de un pais
   * @param country Objeto pais del cual se requiere mostrar el detalle
   */
  showCountryDetail(country: object): void {
    this.selectedCountry = country;
    this.showModal = true;
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
  getFavoriteStatus(country): boolean{
    if(localStorage.getItem(country.alpha3Code) && localStorage.getItem(country.alpha3Code) === 'true'){
      return true;
    }
    return false;
  }

  closeModal(){
    this.showModal = false;
  }

}
