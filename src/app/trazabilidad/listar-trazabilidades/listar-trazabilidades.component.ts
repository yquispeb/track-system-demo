import { Trazabilidad } from './../trazabilidad.model';
import { Component, OnInit } from '@angular/core';
import { SupplierDataService } from 'src/app/services/supplier.data.service';
import { TrazabiliadService } from 'src/app/services/trazabilidad.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listar-trazabilidades',
  templateUrl: './listar-trazabilidades.component.html',
  styleUrls: ['./listar-trazabilidades.component.css']
})
export class ListarTrazabilidadesComponent implements OnInit {
  listaTrazabilidades: any;
  selectedValue='';

  listAplicaciones:any;
  listaTransacciones:any;

  constructor(private supplierDataService:SupplierDataService,
              private trazabilidadService: TrazabiliadService,
              private transaccionService: TransaccionService) { }

  ngOnInit(): void {
    this.listAplicaciones=this.supplierDataService.listAplicaciones;
    this.cargarListaTrazabilidad();
    this.cargarListaTransacciones();
  }

  private cargarListaTrazabilidad() {
    this.trazabilidadService.getAll()
                           .snapshotChanges()
                           .pipe( map(changes => 
                                changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(
      data => {
        this.listaTrazabilidades = data;
      }
    );
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

  buscarAplicacionPorId(idAplicacion:string){
    return this.supplierDataService.buscarAplicacionPorId(idAplicacion);
  }

  transformToDate(dateString:string){
    return new Date(dateString);
  }
  
}
