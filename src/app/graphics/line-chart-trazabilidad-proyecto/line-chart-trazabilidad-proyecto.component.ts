import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { TrazabiliadService } from 'src/app/services/trazabilidad.service';
import { Transaccion } from 'src/app/transaccion/transaccion.model';

@Component({
  selector: 'app-line-chart-trazabilidad-proyecto',
  templateUrl: './line-chart-trazabilidad-proyecto.component.html',
  styleUrls: ['./line-chart-trazabilidad-proyecto.component.css']
})
export class LineChartTrazabilidadProyectoComponent implements OnInit {
  listaTrazabilidades: any[];
  show: boolean=false;
  transaccionSeleccionada:string='';

  constructor(private trazabilidadService:TrazabiliadService,
    private transaccionService:TransaccionService) { }

  ngOnInit(): void {
    this.cargarListaTrazabilidad();
    this.cargarListaTransacciones();
  }
  listaTransacciones: Transaccion[];
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

  lineChartData: ChartDataSets[]=[] ;

  lineChartLabels: Label[] =["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

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
    this.lineChartData=[];
    //const firstMap= this.listaTrazabilidades.map(trazabilidad =>  new Date(trazabilidad.fechaCreacion) .toLocaleString('default', { month: 'long' }));
    const nombreTransaccion=this.transaccionSeleccionada;
    
    const subListaConTransaccion= this.listaTrazabilidades.filter(traz=> traz.transaccion===nombreTransaccion );
    console.log("sublista: filtrada con nombreTransaccion")
    console.log(subListaConTransaccion)

    const mapWithCodigoProyectos= subListaConTransaccion
                                        .map(trazabilidad =>  trazabilidad.proyecto.codigo);
    
    const tempMonth=                     [...new Set(mapWithCodigoProyectos)];
    
    console.log("tempMonth:")
    console.log(tempMonth)

    for (let index = 0; index < tempMonth.length; index++) {
      const proyecto = tempMonth[index];
      console.log("iterando sobre proyecto"+ proyecto);
      const mapWithMonths= subListaConTransaccion.filter(traz=> traz.proyecto.codigo===proyecto)
                                              .map(trazabilidad =>  new Date(trazabilidad.fechaCreacion).getMonth());
      
      console.log("mapa de meses encontrado del proyecto"+ proyecto);
      console.log(mapWithMonths);
      
      const mapReduce = mapWithMonths.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
      console.log(mapReduce);
      const monthReduce =[ ...mapReduce.keys() ].sort();
      
      const monthsIndex = [0,1,2,3,4,5,6,7,8,9,10,11];
      let [min, max] = monthReduce.reduce(([prevMin,prevMax], curr)=>
      [Math.min(prevMin, curr), Math.max(prevMax, curr)], [Infinity, -Infinity]);

      console.log("Min:", min);
      console.log("Max:", max);
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
          //arrayData[monthReduce[indexReduce]]= mapReduce.get(monthReduce[indexReduce]);
        }
      }
      
      
      console.log("arrayData");
      console.log(arrayData);

      this.lineChartData.push( { data: arrayData, label: proyecto });
    }
    this.lineChartLabels = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];;
    this.show=true;
  }

}
