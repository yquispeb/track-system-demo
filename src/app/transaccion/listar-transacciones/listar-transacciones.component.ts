import { Component, OnInit } from '@angular/core';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listar-transacciones',
  templateUrl: './listar-transacciones.component.html',
  styleUrls: ['./listar-transacciones.component.css']
})
export class ListarTransaccionesComponent implements OnInit {
  featurePage: string;
  listaTransacciones:any;

  constructor(private transaccionService:TransaccionService ) { }

  ngOnInit(): void {
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
  
}
