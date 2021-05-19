import { Component, OnInit } from '@angular/core';
import { SupplierDataService } from 'src/app/services/supplier.data.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

import {Transaccion} from '../transaccion.model';

@Component({
  selector: 'app-registrar-transaccion',
  templateUrl: './registrar-transaccion.component.html',
  styleUrls: ['./registrar-transaccion.component.css']
})
export class RegistrarTransaccionComponent implements OnInit {

  aplicacionSeleccionada:string='';
  torreValor:string='';
  transaccionValor:string='';

  listAplicaciones:any;

  constructor(private registrarTransaccionService:TransaccionService,
              private supplierDataService: SupplierDataService) { }

  ngOnInit(): void {
    this.listAplicaciones=this.supplierDataService.listAplicaciones;
  }

  onCrearTransaccion(){

    this.registrarTransaccionService.registrarTransaccion(
      new Transaccion(this.aplicacionSeleccionada,this.torreValor,this.transaccionValor));

    this.cleanVariables();
  }


  private cleanVariables(): void {
    this.aplicacionSeleccionada = '';
    this.torreValor = '';
    this.transaccionValor = '';
  }
}
