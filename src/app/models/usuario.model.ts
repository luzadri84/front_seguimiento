import { PerfilesCuentausuario } from "./perfilescuentausuario.model";

export class Usuario {
    constructor(
        public TipoIdentificacionId: number,
        public PersonaNumeroId: string,
        public PersonaPrimerNombre: string,
        public PersonaSegundoNombre: string,
        public PersonaPrimerApellido: string,
        public PersonaSegundoApellido: string,
        public PersonaEmail: string,
        public CuentaUsuarioClave: string,
        public CuentaUsuarioConfClave: string,
        public CuentaUsuarioRecibirBoletin: any,
        public CuentaUsuarioHabilitada: boolean,
        public PerfilId: number,
        public AreaId: number,
    ) { }
}

export class RecuperarClave{
    constructor(
        public username
    ) {}
}

export class CuentaUsuario {
    constructor(
        public cuentausuarioid: number,
        public personaid: string,
        public cuentausuariousuario: string,
        public cuentausuariodominio: boolean,
        public cuentausuarioemail: string,
        public cuentausuariofechaactualizacionclave: string,
        public cuentausuarionumerointentos: number,
        public cuentausuariovencimiento: string,
        public cuentausuarioplazoprimerlogeo: string,
        public cuentausuariosesionid: any,
        public CuentaUsuarioHabilitada: boolean,
        public perfilesCuentausuario: Array<PerfilesCuentausuario>,
        public cuentausuarioemailnuevo: string,
        public cuentausuarioemailnuevoconf: string,
    ) { }
}

