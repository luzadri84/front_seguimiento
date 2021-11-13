import { CuentaUsuario } from './usuario.model';

export class Session {
    public access_token: string;
    public user: CuentaUsuario;
    public proId: string;
    public vigenciaFutura: number;
}
