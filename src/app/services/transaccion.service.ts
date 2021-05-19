import { Injectable } from '@angular/core';
import { Transaccion } from './../transaccion/transaccion.model';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class TransaccionService {

  private dbPath: string = 'listaTransacciones';
  listaTransacciones: AngularFireList<Transaccion> = null;
  //listaTransacciones: Observable<Transaccion []> = null;

  registrarTransaccion(transaccionData: Transaccion) {
    this.listaTransacciones.push(transaccionData);
  }

  constructor(private db: AngularFireDatabase) {
    this.listaTransacciones = db.list(this.dbPath);
  }

  getAll() :AngularFireList<Transaccion> {
    return this.listaTransacciones;
  }
}
