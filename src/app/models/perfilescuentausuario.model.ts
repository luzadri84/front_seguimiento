import { Perfil } from "./perfiles.model";

export class PerfilesCuentausuario {
    constructor(
        public perfilesCuentausuarioid: number,
        public perfilid: number,
        public cuentausuarioid: number,
        public perfil: Perfil,
    ){}
}