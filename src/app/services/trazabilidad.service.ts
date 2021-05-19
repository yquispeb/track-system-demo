import { Injectable } from '@angular/core';
import { Trazabilidad } from './../trazabilidad/trazabilidad.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class TrazabiliadService {
  private listaTrazabilidades: AngularFireList<Trazabilidad> = null;
  private dbPath: string = 'listaTrazabilidad';

  crearTrazabilidad(traz: Trazabilidad) {
    this.listaTrazabilidades.push(traz);
  }
  constructor(private db: AngularFireDatabase) {
    this.listaTrazabilidades = db.list(this.dbPath);
  }

  getAll() {
    return this.listaTrazabilidades;
  }

}
