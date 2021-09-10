import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrearUsuario } from 'src/app/models/create.user.model';
import { UserLogin } from 'src/app/models/userlogin.model';
import { CuentaUsuario } from 'src/app/models/usuario.model';
import { ForgotPassword } from 'src/app/models/forgot.model';
import { ChangePassword } from 'src/app/models/change.model';
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(public http: HttpClient, public router: Router) { }

    crearUsuario(usuario: CrearUsuario): Observable<any> {
        const url = environment.URL_API + 'seguridad/usuario';
        return this.http.post(url, usuario, {headers:{skip:"true"}});
    }

    loginUsuario(usuario: UserLogin): Observable<any> {
        const url = environment.URL_API + 'seguridad/autenticar';
        return this.http.post(url, usuario, {headers:{skip:"true"}});
    }
    
    actualizarUsuario(usuario: CuentaUsuario): Observable<any> {
        const url = environment.URL_API + 'seguridad/usuario';
        return this.http.put(url, usuario);
    }

    recuperarClave(usuario: ForgotPassword): Observable<any> {
        const url = environment.URL_API + 'seguridad/usuario/recuperar';
        return this.http.post(url, usuario, {headers:{skip:"true"}});
    }

    linkValido(guid: string): Observable<any> {
        const url = environment.URL_API + 'seguridad/usuario/' + guid + '/linkvalido';
        return this.http.post(url, null, {headers:{skip:"true"}});
    }

    confirmarUsuario(guid: string): Observable<any> {
        const url = environment.URL_API + 'seguridad/usuario/' + guid + '/confirmar';
        return this.http.post(url, null, {headers:{skip:"true"}});
    }

    changePassword(usuario: ChangePassword): Observable<any> {
        const url = environment.URL_API + 'seguridad/usuario/cambiar';
        return this.http.post(url, usuario, {headers:{skip:"true"}});
    }
}