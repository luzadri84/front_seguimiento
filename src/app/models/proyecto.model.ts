export class Proyecto {
    constructor(
        public proId: number,
        public proTipoCuenta: string,
        public proNumeroCuenta: string,
        public proNombre: string,
        public entId: number,
        public proIdProponente: number,
        public proPersonaEncargadaProyecto: string,
        public proTelefonosPersonaEncargadaProyecto: string,
        public proCorreoPersonaEncargada: string,
        public zonIdEntidadBancaria: string,
        public zonIdEntidadBancariaDep: string,
        public proEstado: string,

        public usuCreo: string,
        public usuModifico: string,
        public fecCreo: string,
        public fecModifico: string,
    ){}
}