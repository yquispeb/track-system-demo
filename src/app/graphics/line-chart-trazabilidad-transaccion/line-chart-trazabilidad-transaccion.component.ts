import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { TrazabiliadService } from 'src/app/services/trazabilidad.service';

@Component({
  selector: 'app-line-chart-trazabilidad-transaccion',
  templateUrl: './line-chart-trazabilidad-transaccion.component.html',
  styleUrls: ['./line-chart-trazabilidad-transaccion.component.css']
})
export class LineChartTrazabilidadTransaccionComponent implements OnInit {

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

  lineChartData: ChartDataSets[]=[] ;

  lineChartLabels: Label[] ;

  lineChartOptions = {
    responsive: true,
    legend: { position: 'left' }
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
    
    /**
     *1- Extraer la lista de transacciones existentes de la lista de trazabilidad 
     * 
      */
    const mapWithTransacciones= this.listaTrazabilidades.map(trazabilidad =>  trazabilidad.transaccion);
    console.log("sublista: transacciones existentes de todas las trazabilidades")
    console.log(mapWithTransacciones);
    
    //2 - extraer nombres unicos
    const tempTransacciones=                     [...new Set(mapWithTransacciones)];
    console.log(tempTransacciones);
    
    for (let index = 0; index < tempTransacciones.length; index++) {
      const nombreTransaccion = tempTransacciones[index];
    
      const subListaConTransaccion= this.listaTrazabilidades.filter(traz=> traz.transaccion===nombreTransaccion );
      console.log("sublista: filtrada con nombreTransaccion")
      console.log(subListaConTransaccion)

      const mapWithCodigoProyectos= subListaConTransaccion.map(trazabilidad =>  new Date(trazabilidad.fechaCreacion).getMonth());
      console.log("mapa de meses encontrado de la transaccion "+ nombreTransaccion);
      console.log(mapWithCodigoProyectos);

      const mapReduce = mapWithCodigoProyectos.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
      console.log("mapReduce");
      console.log(mapReduce);

      const monthReduce =[ ...mapReduce.keys() ].sort();
      console.log("monthReduce");
      console.log(monthReduce);
      let [min, max] = monthReduce.reduce(([prevMin,prevMax], curr)=>
      [Math.min(prevMin, curr), Math.max(prevMax, curr)], [Infinity, -Infinity]);
      console.log("Min:", min);
      console.log("Max:", max);

      const monthsIndex = [0,1,2,3,4,5,6,7,8,9,10,11];
      const arrayData=[];

      for (let index = 0; index < monthsIndex.length; index++) {
        const month = monthsIndex[index];
        console.log("month analizado"+ month )
        for (let indexReduce = 0; indexReduce < monthReduce.length; indexReduce++) {
          if (month < min || month > max) {
            console.log("MEs no permitido para registrar--no existen registros "+ month )
            break;
          }
          console.log("mes dentro del rago para asignar registro "+ month )
          console.log("monthReduce[indexReduce] "+ monthReduce[indexReduce] )
          if (monthReduce[indexReduce]===month) {
            arrayData[month]= mapReduce.get(month);
            break;
          }else{
            console.log("a cero -->"+ month )
            arrayData[month]= 0;
          }
        }
      }

      console.log("arrayData");
      console.log(arrayData);
      this.lineChartData.push( { data: arrayData, label: nombreTransaccion });
    }
    
    this.lineChartLabels = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    this.show=true;
  }

}
