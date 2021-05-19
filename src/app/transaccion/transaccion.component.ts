import { Component, Input } from '@angular/core';

import{ Transaccion} from './transaccion.model';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html'
})
export class TransaccionComponent {

  @Input()  transaccionElement:Transaccion;

}
