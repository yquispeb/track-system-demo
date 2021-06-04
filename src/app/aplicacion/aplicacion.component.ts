import { Component, OnInit ,ViewChild } from '@angular/core';
import { debounceTime, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AplicacionService } from '../services/aplicacion.service';
import { Aplicacion } from '../model/aplicacion.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {
  @ViewChild('form', { static: false }) signupForm: NgForm;

  private _success = new Subject<string>();
  private _error = new Subject<string>();

  listAplicaciones:any;
  constructor(private aplicacionService:AplicacionService) { }


  ngOnInit(): void {
    this.cargarListaAplicaciones() ;
    this._success.subscribe(message => this.successMessage = message);
    this._error.subscribe(message => this.errorMessage = message);
    this._success.pipe(debounceTime(3500)).subscribe(() => {
      this.isLoadingSucces=false;
    });
    this._error.pipe(debounceTime(3500)).subscribe(() => {
      this.errorMessage=null;
    });
  }

  aplicacion={
    nombreAplicacion:'',
    usuarioResponsable:'',
    torreValor:''
  };

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


  onCrearAplicacion(){
    this.isLoading=true;
    this.aplicacion.nombreAplicacion= this.signupForm.value.nombreAplicacion;
    this.aplicacion.usuarioResponsable= this.signupForm.value.usuarioResponsable;
    this.aplicacion.torreValor=this.signupForm.value.torreValor;

    if (!this.aplicacionExiste(this.aplicacion.nombreAplicacion)) {
      this._error.next("Aplicacion "+ this.aplicacion.nombreAplicacion + " ya existe!")
      this.isLoading=false;
      this.signupForm.reset();
      return;
    }

    this.aplicacionService.crearAplicacion(new Aplicacion('',this.aplicacion.nombreAplicacion,
    this.aplicacion.usuarioResponsable,this.aplicacion.torreValor));
    console.log(this.aplicacion);
    this.isLoading=false;
    this.isLoadingSucces=true;
    this.signupForm.reset();
    this._success.next("Aplicacion creada correctamente")
  }
  aplicacionExiste(nombreAplicacion: string) :boolean{
    const result  =this.listAplicaciones.find(aplicacion =>{aplicacion.nombreAplicacion === nombreAplicacion});
    console.log("resultado de validacion de "+ nombreAplicacion + " --> " + result);
    return result;
  }

  isLoading:boolean =false;
  isLoadingSucces:boolean =false;
  errorMessage: string=null;
  successMessage: string=null;

}
