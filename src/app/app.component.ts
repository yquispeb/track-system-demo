import { Component } from '@angular/core';
import { TransaccionService } from './services/transaccion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit(): void {}

  constructor(private transaccionService:TransaccionService){}
}
