import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { Transaccion } from 'src/app/transaccion/transaccion.model';
import { Label,Color } from 'ng2-charts';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-graphics-torres',
  templateUrl: './graphics-torres.component.html',
  styleUrls: ['./graphics-torres.component.css']
})
export class GraphicsTorresComponent implements OnInit {
  listaTransacciones: Transaccion[];
  constructor(private transaccionService:TransaccionService) { }

  ngOnInit(): void {
       this.isLoading=true;
       this.cargarListaTransacciones();
  }

  isLoading:boolean =false;
  private cargarListaTransacciones() {
    this.transaccionService.getAll()
                            .snapshotChanges()
                           .pipe( 
                             map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
                            ).subscribe(
                            data => {
                              this.listaTransacciones = data;
                              this.mostrarTransacciones();
                              this.isLoading =false;
                            }
                          );
  }


  mostrarTransacciones(){
    const firstMap= this.listaTransacciones.map(transaccion => transaccion.torreValor);
    const mapReduce = firstMap.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    console.log(mapReduce);
    this.barChartLabels =[ ...mapReduce.keys() ];
    const arrayData=[];
    for (let index = 0; index < this.barChartLabels.length; index++) {
      arrayData[index]= mapReduce.get(this.barChartLabels[index]);
    }
    console.log(arrayData);
    this.barChartData=[
      { data: arrayData, label: 'cantidad de transacciones por torre' }
    ];
    this.show=true;
  }
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartColors: Color[] = [
    { backgroundColor: 'green' },
  ]
  barChartLabels: Label[] ;
  barChartLegend = true;
  barChartPlugins = [];
  show:boolean=false;
  barChartData: ChartDataSets[] ;
  barChartType: ChartType = 'bar';
}
