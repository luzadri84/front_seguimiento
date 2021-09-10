export class CrearUsuario {
    constructor(
        public tipIdEntidad: number,
        public tipoEntidad: number,
        public correo: string,
        public nombreusuario: string,
        public contrasena: string,
        public confcontrasena: string,
        public nit: string
    ){}
}