export class Seguimientos {
    segId : number;
    proId: number;
    actId : number;
    segObservacion : string;
    usuCreo : string;
    usuModifico : string;
    segFechaCreo : string;
    segFechaSeguimiento : string;
    SegFechaModifico : string;
    segMotivoVisitaNoRealizada: string;
    segEstado: number;
}

export class Actividades{
    constructor(
        public aCT_ID: number,
        public aCT_NOMBRE: string
    ){}
}