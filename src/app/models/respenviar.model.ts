export class RespuestaEnvio {
    public resultado: boolean;
    public mensaje: string;
    public errores : Array<Errores>[];
}

export class Errores {
    public codigo: string;
    public descripcion: string;
}