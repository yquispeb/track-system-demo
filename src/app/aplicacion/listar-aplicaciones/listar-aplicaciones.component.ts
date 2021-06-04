import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { AplicacionService } from 'src/app/services/aplicacion.service';

@Component({
  selector: 'app-listar-aplicaciones',
  templateUrl: './listar-aplicaciones.component.html',
  styleUrls: ['./listar-aplicaciones.component.css']
})
export class ListarAplicacionesComponent implements OnInit, OnDestroy {
  listaAplicacion:any;
  aplicacionForModal;
  isSuccess:boolean=false;
  constructor(private aplicacionService:AplicacionService,
    private modalService: NgbModal) { }



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
    this.message = '';
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
  closeResult = '';
  editDataAplicacion(content, aplicacionSeleccionada){
    this.aplicacionForModal=aplicacionSeleccionada;

    this.modalService.open(content, 
           {ariaLabelledBy: 'modal-basic-title'})
        .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }

  actualizarAplicacion(){
    const data = {
      nombreAplicacion: this.aplicacionForModal.nombreAplicacion,
      torreValor: this.aplicacionForModal.torreValor,
      usuarioResponsable:this.aplicacionForModal.usuarioResponsable
    };

    if (this.aplicacionForModal.key) {
      this.aplicacionService.update(this.aplicacionForModal.key, data)
        .then(() =>{
          this.message = 'La aplicacion se actualizó correctamente!'
          this.isSuccess=true;
        } )
        .catch(err => console.log(err));
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  message = '';
}
