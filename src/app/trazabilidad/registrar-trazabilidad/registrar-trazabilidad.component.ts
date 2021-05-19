import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierDataService } from 'src/app/services/supplier.data.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { TrazabiliadService } from 'src/app/services/trazabilidad.service';
import { UploadService } from 'src/app/services/upload.service';
import { Trazabilidad } from '../trazabilidad.model';
import { finalize, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-registrar-trazabilidad',
  templateUrl: './registrar-trazabilidad.component.html',
  styleUrls: ['./registrar-trazabilidad.component.css']
})
export class RegistrarTrazabilidadComponent implements OnInit {
  @ViewChild('form', { static: false }) signupForm: NgForm;

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
    private storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.listAplicaciones = this.supplierDataService.listAplicaciones;
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
        console.log(this.listaTransacciones);
      }
    );
  }

  onCreateTrazabilidad(): void {
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
  }

  getAplicacionForGetTransaccion(){
    console.log("metodo lanzado para buscar transaccion de "+this.nombreAplicacion)
    console.log(this.listaTransacciones);

    const nombreAplicacion=this.supplierDataService.buscarAplicacionPorId(this.nombreAplicacion);
    this.subListaTransacciones= this.listaTransacciones.filter(t => t.aplicacionSeleccionada ===nombreAplicacion);
    console.log(this.subListaTransacciones);
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
}
