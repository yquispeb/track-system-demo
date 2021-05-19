import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Insumo } from '../model/insumo.model';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  private listaInsumos: AngularFireList<Insumo> = null;
  private dbPath: string = 'listaInsumos';

  constructor(private db: AngularFireDatabase) {
    this.listaInsumos = db.list(this.dbPath);
  }

  crearInsumo(insumo: Insumo) {
    this.listaInsumos.push(insumo);
  }

  getAll() {
    return this.listaInsumos;
  }
}
