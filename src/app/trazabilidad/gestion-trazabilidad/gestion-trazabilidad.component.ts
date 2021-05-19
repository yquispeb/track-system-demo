import { Component, OnInit, ViewChild } from '@angular/core';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { map } from 'rxjs/operators';
import { SupplierDataService } from 'src/app/services/supplier.data.service';
import { NgForm } from '@angular/forms';
import { TrazabiliadService } from 'src/app/services/trazabilidad.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-gestion-trazabilidad',
  templateUrl: './gestion-trazabilidad.component.html',
  styleUrls: ['./gestion-trazabilidad.component.css']
})
export class GestionTrazabilidadComponent implements OnInit {
  listaTrazabilidades = [];
  subListaTrazabilidades: any[];
  trazabilidadForModal: any=null;
  subListaTransacciones: any;

  constructor(
    private supplierDataService: SupplierDataService,
    private transaccionService: TransaccionService,
    private trazabilidadService: TrazabiliadService,
    private modalService: NgbModal,
    private storage: AngularFireStorage) { }

  @ViewChild('form', { static: false }) gestionTrazabilidadForm: NgForm;

  ngOnInit(): void {
    this.listAplicaciones = this.supplierDataService.listAplicaciones;
    this.cargarListaTransacciones();
    this.trazabilidadService.getAll()
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      ).subscribe(
        data => {
          this.listaTrazabilidades = data;
        }
      );
  }

  listAplicaciones: any;
  listaTransacciones: any;

  trazabilidadSearch: {
    idAplicacion: string,
    codigoProyecto: string,
    transaccion: any
  } = { idAplicacion: '', codigoProyecto: '', transaccion: null };

  transaccionValor:any = null;
  idAplicacion: string;

  private cargarListaTransacciones() {
    this.transaccionService.getAll()
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      ).subscribe(
        data => {
          this.listaTransacciones = data;
        }
      );
  }

  onBuscarTrazabilidad() {
    this.trazabilidadSearch.idAplicacion = this.idAplicacion;
    this.trazabilidadSearch.codigoProyecto = this.gestionTrazabilidadForm.value.codProyecto;
    this.trazabilidadSearch.transaccion = this.transaccionValor==null ?{  }:this.transaccionValor;

    console.log(this.listaTrazabilidades);
    console.log( this.listaTransacciones)
    console.log( this.transaccionValor);
    console.log( this.trazabilidadSearch)
    
     this.subListaTrazabilidades = this.listaTrazabilidades
      .filter(traz => traz.aplicacion === this.trazabilidadSearch.idAplicacion 
                      && (traz.transaccion===this.trazabilidadSearch.transaccion.transaccionValor ||
                          traz.proyecto.codigo === this.trazabilidadSearch.codigoProyecto  ))


    console.log(this.subListaTrazabilidades);

    this.gestionTrazabilidadForm.reset();
  }
  buscarAplicacionPorId(idAplicacion:string){
    return this.supplierDataService.buscarAplicacionPorId(idAplicacion);
  }

  validacionformulario(){
    return !this.gestionTrazabilidadForm.valid 
  }
  openModalTrazabilidadDetalle(content, trazabilidad){
    this.trazabilidadForModal=trazabilidad;
    const ref = this.storage.ref(this.trazabilidadForModal.urlDocumento);
    this.profileUrl = ref.getDownloadURL();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  closeResult = '';

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  profileUrl: Observable<string | null>;

  descargarArchivo(urlArchivo:string){
    console.log("archivo a buscar:" + urlArchivo);
    const ref = this.storage.ref(urlArchivo);
    this.profileUrl = ref.getDownloadURL();
  }
  getAplicacionForGetTransaccion(){
    console.log("metodo lanzado para buscar transaccion de "+this.idAplicacion)
    console.log(this.listaTransacciones);

    const nombreAplicacion=this.supplierDataService.buscarAplicacionPorId(this.idAplicacion);
    this.subListaTransacciones= this.listaTransacciones.filter(t => t.aplicacionSeleccionada ===nombreAplicacion);
    console.log(this.subListaTransacciones);
  }
}
