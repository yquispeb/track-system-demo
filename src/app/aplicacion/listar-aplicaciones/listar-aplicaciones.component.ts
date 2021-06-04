import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AplicacionService } from 'src/app/services/aplicacion.service';

@Component({
  selector: 'app-listar-aplicaciones',
  templateUrl: './listar-aplicaciones.component.html',
  styleUrls: ['./listar-aplicaciones.component.css']
})
export class ListarAplicacionesComponent implements OnInit, OnDestroy {
  listaAplicacion:any;
  constructor(private aplicacionService:AplicacionService) { }
  ngOnDestroy(): void {
    // this.tempOnSubscription.unsubscribe();
  }
  // private tempOnSubscription:Subscription;

  ngOnInit(): void {
    //const data = from(fetch('/api/endpoint'));
    // this.tempOnSubscription= interval(1000)
    //   .pipe( map( (response: number)=>{ return 'Value of data: '+(response*10)}))
    //   .subscribe({
    //   next( response) {console.log(response);},
    //   error(err) {console.log('Error: '+ err);},
    //   complete(){console.log('Completed');}
    // });

    this.cargarListaAplicaciones();
  }

  private cargarListaAplicaciones() {
    this.aplicacionService.getAll()
                           .snapshotChanges()
                           .pipe( map(changes => 
                                changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(
      data => {
        this.listaAplicacion = data;
      }
    );
  }

}
