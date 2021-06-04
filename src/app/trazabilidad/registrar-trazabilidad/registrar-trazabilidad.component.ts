import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierDataService } from 'src/app/services/supplier.data.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { TrazabiliadService } from 'src/app/services/trazabilidad.service';
import { UploadService } from 'src/app/services/upload.service';
import { Trazabilidad } from '../trazabilidad.model';
import { debounceTime, finalize, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AplicacionService } from 'src/app/services/aplicacion.service';

@Component({
  selector: 'app-registrar-trazabilidad',
  templateUrl: './registrar-trazabilidad.component.html',
  styleUrls: ['./registrar-trazabilidad.component.css']
})
export class RegistrarTrazabilidadComponent implements OnInit {
  @ViewChild('form', { static: false }) signupForm: NgForm;

  aplicacionSeleccionada='';
  nombreAplicacion = '';
  transaccionSeleccionada = '';
  listaTransacciones: any;
  subListaTransacciones:any;
  listAplicaciones: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  listaDocumentacion: { nombreDocumento: string , urlDocumento:string}[]=[];
  nameOfFile: any;
  
  constructor(private supplierDataService: SupplierDataService,
    private transaccionService: TransaccionService,
    private trazabilidadService: TrazabiliadService,
    private uploadService:UploadService,
    private storage: AngularFireStorage,
    private aplicacionService: AplicacionService) {}

  ngOnInit(): void {
    this.cargarListaTransacciones();
    this.cargarListaAplicaciones();
    this.nombreAplicacion='Selecciona...';
    this.transaccionSeleccionada = 'Selecciona...';
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(3500)).subscribe(() => {
      this.isLoadingSucces=false;
    });
  }

  private cargarListaTransacciones() {
    this.transaccionService.getAll()
                           .snapshotChanges()
                           .pipe( map(changes => 
                                changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(
      data => {
        this.listaTransacciones = data;
        //console.log(this.listaTransacciones);
      }
    );
  }

  private cargarListaAplicaciones() {
    this.aplicacionService.getAll()
                           .snapshotChanges()
                           .pipe( map(changes => 
                                changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(
      data => {
        this.listAplicaciones = data;
       // console.log('Lista de aplicaciones recibida: ');
        //console.log(this.listAplicaciones);
      }
    );
  }
  private _success = new Subject<string>();

  onCreateTrazabilidad(): void {
    this.isLoading=true;
    var dateNow= new Date();
    this.trazabilidadService.crearTrazabilidad(
      new Trazabilidad(
        this.nombreAplicacion, 
        this.transaccionSeleccionada, 
        this.signupForm.value.torreValor,
        { codigo: this.signupForm.value.codigoProyecto,
          descripcion: this.signupForm.value.descripcionProyecto },
        this.listaDocumentacion,
        dateNow.toISOString() )
    );
    this.signupForm.reset();
    this.isLoading=false;
    this.isLoadingSucces=true;
    this._success.next("Trazabilidad creada correctamente!")
  }

  getAplicacionForGetTransaccion(){
    //console.log("metodo lanzado para buscar transaccion de "+this.nombreAplicacion)
    //console.log(this.listaTransacciones);
    // const nombreAplicacion=this.supplierDataService.buscarAplicacionPorId(this.nombreAplicacion);
    //const nombreAplicacion=this.buscarAplicacionPorId(this.nombreAplicacion);
    this.subListaTransacciones= this.listaTransacciones.filter(t => t.aplicacionSeleccionada.key ===this.nombreAplicacion);
    //console.log(this.subListaTransacciones);
  }

  buscarAplicacionPorId(idAplicacion:string):string{
    return this.listAplicaciones
               .find(
                   app => app.key === idAplicacion 
                  ).nombreAplicacion;
  } 

  uploadFile(event){
    //this.uploadService.uploadFile(event);
    //this.downloadURL=this.uploadService.downloadURL;
    //this.uploadPercent= this.uploadService.uploadPercent;
    
    const file = event.target.files[0];
    this.nameOfFile=file.name;
    const filePath = '/upload/documents/'+this.nameOfFile;
    const fileRef = this.storage.ref(filePath);
    console.log("nombre de archivo ..." + file.name);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(
        () => this.downloadURL = fileRef.getDownloadURL()
       )
      )
      .subscribe()

      this.listaDocumentacion.push({ nombreDocumento: this.nameOfFile , urlDocumento: filePath});
  }

  isLoading:boolean =false;
  isLoadingSucces:boolean =false;
  errorMessage: string=null;
  successMessage: string=null;
}
