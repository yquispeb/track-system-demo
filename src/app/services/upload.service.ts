import { Injectable } from '@angular/core';
import { AngularFireStorage }  from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage) { }
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  uploadFile(event) {
    const file = event.target.files[0];
    const nameOfFile=file.name;
    const filePath = '/upload/documents/'+nameOfFile;
    const fileRef = this.storage.ref(filePath);
    console.log("nombre de archivo ..." + file.name);
    const task = this.storage.upload(filePath, file);
     // observe percentage changes
     this.uploadPercent = task.percentageChanges();
     // get notified when the download URL is available
     task.snapshotChanges().pipe(
         finalize(() => this.downloadURL = fileRef.getDownloadURL() )
      )
     .subscribe()
  }
}
