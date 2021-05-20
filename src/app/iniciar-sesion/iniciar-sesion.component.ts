import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticadorService } from '../services/autenticador.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  @ViewChild('form', { static: false }) signupForm: NgForm;
  constructor(private authService: AutenticadorService, private router :Router) { }

  ngOnInit(): void {
  }

  onIniciarSesion(){
    this.errorMessage=null;
    const usuario= this.signupForm.value.usuario;
    const credencial= this.signupForm.value.credencial;

    this.isLoading=true;

      this.authService.iniciarSesion(usuario, credencial).subscribe(
        restData => {
          console.log(restData);
          this.isLoading=false;
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.errorMessage=error;
          this.isLoading=false;
        }
      );
    
    this.signupForm.reset();
  }

  isLoading:boolean =false;
  errorMessage: string=null;

}
