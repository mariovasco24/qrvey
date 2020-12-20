import {Injectable} from "@angular/core";
declare var configApp: any;

@Injectable()
export class RoutesServices{
	public url:string = configApp.apiUrl;
	
	urlWebService(tipo:string): string{
		switch (tipo) {
			case "AllCountries":
				return this.url+"/all";
		}	
	}
}