import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: '',
  template: `<a [href]="profileUrl | async">{{ profileUrl | async }}</a>`,
})
export class GetFileComponentComponent{

  profileUrl: Observable<string | null>;
  constructor(private storage: AngularFireStorage) {
     const ref = this.storage.ref('users/davideast.jpg');
     this.profileUrl = ref.getDownloadURL();
  }

}
