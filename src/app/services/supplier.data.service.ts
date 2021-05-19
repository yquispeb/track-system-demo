import { Injectable } from '@angular/core';
import { Aplicacion }  from '../model/aplicacion.model'


@Injectable({
  providedIn: 'root'
})
export class SupplierDataService {
  listAplicaciones: Aplicacion[]=null;
  enableUser: boolean=false;

  constructor() {
    this.listAplicaciones =[
      new Aplicacion('1','SIAC UNICO','',''),
      new Aplicacion('2','SISACT','','')
    ];
  }

  buscarAplicacionPorId(idAplicacion:string):string{
    return this.listAplicaciones
               .find(
                   app => app.idAplicacion === idAplicacion 
                  ).nombreAplicacion;
  }  

  isEnabled():boolean{
    return this.enableUser;
  }

}
