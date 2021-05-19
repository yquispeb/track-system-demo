import { Observable } from 'rxjs';

export class Trazabilidad {

  constructor(
    private aplicacion: string,
    private transaccion: string,
    private torre: string,
    private proyecto: { codigo: string, descripcion: string },
    private documentacion:{ nombreDocumento: string , urlDocumento:string} [],
    private fechaCreacion:string) {
    };


}
