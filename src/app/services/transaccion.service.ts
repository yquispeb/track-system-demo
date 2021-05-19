import { Injectable } from '@angular/core';
import { Transaccion } from './../transaccion/transaccion.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class TransaccionService {

  private dbPath: string = 'listaTransacciones';
  listaTransacciones: AngularFireList<Transaccion> = null;

  registrarTransaccion(transaccionData: Transaccion) {
    this.listaTransacciones.push(transaccionData);
  }

  constructor(private db: AngularFireDatabase) {
    this.listaTransacciones = this.db.list(this.dbPath);
  }

  getAll() {
    return this.listaTransacciones;
  }
}
