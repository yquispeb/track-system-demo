export class Insumo{
    constructor(public nombreAplicacion:string ,
        public codigoProyecto:string,
        public transaccion:string,
        public listaComponenteSP:any[],
        public listaComponenteWS:any[]){}
}