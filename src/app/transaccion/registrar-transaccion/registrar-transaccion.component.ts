import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
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

  constructor(private registrarTransaccionService:TransaccionService,
              private supplierDataService: SupplierDataService,
              private aplicacionService: AplicacionService)
               { }

  ngOnInit(): void {
    this.cargarListaAplicaciones();
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
    
   const aplicacion = this.listAplicaciones.find(app => app.key === this.aplicacionSeleccionada);
     this.registrarTransaccionService.registrarTransaccion(
          new Transaccion(aplicacion,this.torreValor,this.transaccionValor));
    this.cleanVariables();
  }


  private cleanVariables(): void {
    this.aplicacionSeleccionada = '';
    this.torreValor = '';
    this.transaccionValor = '';
  }
}
