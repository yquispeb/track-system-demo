import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { AplicacionService } from 'src/app/services/aplicacion.service';
import { SupplierDataService } from 'src/app/services/supplier.data.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

import {Transaccion} from '../transaccion.model';

@Component({
  selector: 'app-registrar-transaccion',
  templateUrl: './registrar-transaccion.component.html',
  styleUrls: ['./registrar-transaccion.component.css']
})
export class RegistrarTransaccionComponent implements OnInit {

  aplicacionSeleccionada:string='Selecciona...';
  torreValor:string='';
  transaccionValor:string='';

  listAplicaciones:any;

  private _success = new Subject<string>();
  private _error = new Subject<string>();
  
  constructor(private registrarTransaccionService:TransaccionService,
              private supplierDataService: SupplierDataService,
              private aplicacionService: AplicacionService)
               { }

  ngOnInit(): void {
    this.cargarListaAplicaciones();
    this.cargarListaTransacciones();
    this._success.subscribe(message => this.successMessage = message);
    this._error.subscribe(message => this.errorMessage = message);
    this._success.pipe(debounceTime(3500)).subscribe(() => {
      this.isLoadingSucces=false;
    });
    this._error.pipe(debounceTime(3500)).subscribe(() => {
      this.errorMessage=null;
    });
  }

  private cargarListaAplicaciones() {
    this.aplicacionService.getAll()
                           .snapshotChanges()
                           .pipe( map(changes => 
                                changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(
      data => {
        this.listAplicaciones = data;
      }
    );
  }

  onCrearTransaccion(){
    this.isLoading=true;
    const aplicacion = this.listAplicaciones.find(app => app.key === this.aplicacionSeleccionada);

    if (!this.transaccionExiste(this.transaccionValor)) {
      this._error.next("Transaccion "+ this.transaccionValor + " ya existe!")
      this.isLoading=false;
      return;
    }

    this.registrarTransaccionService.registrarTransaccion(
          new Transaccion(aplicacion,this.torreValor,this.transaccionValor.toLocaleUpperCase()));
    this.cleanVariables();
    this.isLoading=false;
    this.isLoadingSucces=true;
    this._success.next("Transaccion creada correctamente")
  }
  transaccionExiste(transaccionValor: string) {
    const result  =this.listaTransacciones.find(aplicacion =>{aplicacion.transaccionValor.toLocaleUpperCase() === transaccionValor.toLocaleUpperCase()});
    //console.log("resultado de validacion de "+ transaccionValor + " --> " + result);
    return result;
  }


  private cleanVariables(): void {
    this.aplicacionSeleccionada = '';
    this.torreValor = '';
    this.transaccionValor = '';
  }

  isLoading:boolean =false;
  isLoadingSucces:boolean =false;
  errorMessage: string=null;
  successMessage: string=null;
  listaTransacciones: Transaccion[];

  private cargarListaTransacciones() {
    this.registrarTransaccionService.getAll()
                           .snapshotChanges()
                           .pipe( map(changes => 
                                changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(
      data => {
        this.listaTransacciones = data;
      }
    );
  }
}
