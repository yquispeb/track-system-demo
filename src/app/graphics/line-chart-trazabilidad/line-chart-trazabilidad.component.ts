import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { TrazabiliadService } from 'src/app/services/trazabilidad.service';
import { Trazabilidad } from 'src/app/trazabilidad/trazabilidad.model';

@Component({
  selector: 'app-line-chart-trazabilidad',
  templateUrl: './line-chart-trazabilidad.component.html',
  styleUrls: ['./line-chart-trazabilidad.component.css']
})
export class LineChartTrazabilidadComponent implements OnInit {
  listaTrazabilidades: any[];
  show: boolean=false;

  constructor(private trazabilidadService:TrazabiliadService) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.cargarListaTransacciones();
  }
  isLoading:boolean =false;
  private cargarListaTransacciones() {
    this.trazabilidadService.getAll()
                           .snapshotChanges()
                           .pipe( map(changes => 
                                changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(
      data => {
        this.listaTrazabilidades = data;
        this.mostrarTrazabilidades();
        this.isLoading=false;
      }
    );
  }

  lineChartData: ChartDataSets[] ;

  lineChartLabels: Label[] =["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  
  mostrarTrazabilidades(){
    
    //const firstMap= this.listaTrazabilidades.map(trazabilidad =>  new Date(trazabilidad.fechaCreacion) .toLocaleString('default', { month: 'long' }));
    
    const firstMap= this.listaTrazabilidades.map(trazabilidad =>  new Date(trazabilidad.fechaCreacion).getMonth());

    const mapReduce = firstMap.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    
    console.log(mapReduce);
    const monthReduce =[ ...mapReduce.keys() ].sort();

    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    
    console.log('months reduce');
    console.log(monthReduce);
    const labelsMont=[];
    for (let index = 0; index < monthReduce.length; index++) {
      var monthName=monthNames[monthReduce[index]];
      console.log(monthName);
      labelsMont[index]= monthName;
    }
    this.lineChartLabels =labelsMont;
    const arrayData=[];

    for (let index = 0; index < monthReduce.length; index++) {
      arrayData[index]= mapReduce.get(monthReduce[index]);
    }

    console.log(arrayData);
    this.lineChartData=[
      { data: arrayData, label: 'historial de trazabilidades' }
     
    ];

    this.show=true;
  }
}
