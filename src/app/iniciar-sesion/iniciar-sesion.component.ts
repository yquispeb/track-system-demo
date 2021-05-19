import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SupplierDataService } from '../services/supplier.data.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  @ViewChild('form', { static: false }) signupForm: NgForm;
  usuario: any;
  credencial: any;

  constructor(private supplierDataService: SupplierDataService) { }

  ngOnInit(): void {
  }

  onIniciarSesion(){
    this.usuario= this.signupForm.value.usuario;
    this.credencial= this.signupForm.value.credencial;
    if (this.usuario==='admin' && this.credencial==='admin') {
      this.supplierDataService.enableUser=true;
    }else{
      this.supplierDataService.enableUser=false;
    }
    this.signupForm.reset;
  }

}
