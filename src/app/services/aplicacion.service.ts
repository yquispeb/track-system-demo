import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Aplicacion } from '../model/aplicacion.model';

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {

  private listaAplicacion: AngularFireList<Aplicacion> = null;
  private dbPath: string = 'listaAplicacion';

  constructor(private db: AngularFireDatabase) {
    this.listaAplicacion = db.list(this.dbPath);
  }

  crearAplicacion(aplicacion: Aplicacion) {
    this.listaAplicacion.push(aplicacion);
  }

  getAll() {
    return this.listaAplicacion;
  }
  
  update(key: string, value: any): Promise<void> {
    return this.listaAplicacion.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.listaAplicacion.remove(key);
  }
}
