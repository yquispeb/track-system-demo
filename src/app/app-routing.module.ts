import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ListarTransaccionesComponent } from './transaccion/listar-transacciones/listar-transacciones.component';
import { RegistrarTransaccionComponent } from './transaccion/registrar-transaccion/registrar-transaccion.component';
import { GestionTrazabilidadComponent } from './trazabilidad/gestion-trazabilidad/gestion-trazabilidad.component';
import { ListarTrazabilidadesComponent } from './trazabilidad/listar-trazabilidades/listar-trazabilidades.component';
import { RegistrarInsumosComponent } from './trazabilidad/registrar-trazabilidad/registrar-insumos/registrar-insumos.component';
import { RegistrarTrazabilidadComponent } from './trazabilidad/registrar-trazabilidad/registrar-trazabilidad.component';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { ListarAplicacionesComponent } from './aplicacion/listar-aplicaciones/listar-aplicaciones.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { GraphicsComponent } from './graphics/graphics.component';

const routes: Routes = [
  { path:'registarTansaccion', component:RegistrarTransaccionComponent},
  { path:'listarTransacciones', component: ListarTransaccionesComponent},
  { path:'registrarTrazabilidad', component:RegistrarTrazabilidadComponent},
  { path:'listarTrazabilidades', component:ListarTrazabilidadesComponent},
  { path:'registarInsumo', component:RegistrarInsumosComponent},
  { path:'gestionTrazabilidad', component:GestionTrazabilidadComponent},
  { path:'registarAplicaciones', component:AplicacionComponent},
  { path:'listarAplicaciones', component:ListarAplicacionesComponent},
  { path:'iniciarSesion', component:IniciarSesionComponent},
  { path:'graphics', component:GraphicsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
