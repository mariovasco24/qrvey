import {Injectable} from "@angular/core";
import { DATA } from '@shared/services/constantsService';
/**
 * Configuacion principal de la aplicacion
 */
declare var configApp: any;
/**
 * Clase utilizada para manejar las diferentes rutas del endpoint
 */
@Injectable()
export class RoutesServices{
	/**
	 * Url principal del EndPoint
	 */
	public url:string = configApp.apiUrl;
	
	/**
	 * Maneja las rutas del endpoint
	 * @param endPoint Especifica el endpoint a consumir
	 * @returns Ruta completa del endpoint a consumir
	 */
	urlWebService(endPoint:string): string{
		switch (endPoint) {
			case DATA.AllCountries:
				return this.url+"/all";
		}	
	}
}