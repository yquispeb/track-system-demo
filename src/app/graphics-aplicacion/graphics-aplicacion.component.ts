import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label,Color } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { TransaccionService } from '../services/transaccion.service';
import { Transaccion } from '../transaccion/transaccion.model';

@Component({
  selector: 'app-graphics-aplicacion',
  templateUrl: './graphics-aplicacion.component.html',
  styleUrls: ['./graphics-aplicacion.component.css']
})
export class GraphicsAplicacionComponent implements OnInit {
  listaTransacciones: Transaccion[];
  listaTorres: string[];
  isLoading:boolean =false;

  constructor(private transaccionService:TransaccionService){}

  ngOnInit(): void {
    this.isLoading=true;
    this.cargarListaTransacciones();
  }

  
  private cargarListaTransacciones() {
    this.transaccionService.getAll()
                           .snapshotChanges()
                           .pipe( map(changes => 
                                changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(
      data => {
        this.listaTransacciones = data;
        this. mostrarTransacciones();
        this.isLoading=false;
      }
    );
  }

  mostrarTransacciones(){
    const firstMap= this.listaTransacciones.map(transaccion => transaccion.aplicacionSeleccionada);
    const mapReduce = firstMap.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    console.log(mapReduce);
    this.barChartLabels =[ ...mapReduce.keys() ];
    const arrayData=[];
    for (let index = 0; index < this.barChartLabels.length; index++) {
      arrayData[index]= mapReduce.get(this.barChartLabels[index]);
    }
    console.log(arrayData);
    this.barChartData=[
      { data: arrayData, label: 'cantidad de transacciones por aplicacion' }
    ];
    this.show=true;
  }
  
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartColors: Color[] = [
    { backgroundColor: 'red' },
    { backgroundColor: 'green' },
  ]

  barChartLabels: Label[] ;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] ;
  show:boolean=false;

}
