import { Component, OnInit } from '@angular/core';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { map } from 'rxjs/operators';
import { AplicacionService } from 'src/app/services/aplicacion.service';

@Component({
  selector: 'app-listar-transacciones',
  templateUrl: './listar-transacciones.component.html',
  styleUrls: ['./listar-transacciones.component.css']
})
export class ListarTransaccionesComponent implements OnInit {
  featurePage: string;
  listaTransacciones:any;
  listAplicaciones:any;

  constructor(private transaccionService:TransaccionService, 
              private aplicacionService: AplicacionService) { }
  

  ngOnInit(): void {
    this.cargarListaAplicaciones();
    this.cargarListaTransacciones()
  }


  private cargarListaTransacciones() {
    this.transaccionService.getAll()
                           .snapshotChanges()
                           .pipe( map(changes => 
                                changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(
      data => {
        this.listaTransacciones = data;
      }
    );
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


  // findNombreAplicacionByKey(key:string){
  //   this.aplicacionService.getAll()
  //                          .snapshotChanges()
  //                          .pipe( map(changes => 
  //                               changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
  //   ).subscribe(
  //     data => {
  //       this.listAplicaciones = data;
  //       return this.listAplicaciones.find(app => app.key === key  ).nombreAplicacion;
  //     }
  //   );
  // }
  
}
