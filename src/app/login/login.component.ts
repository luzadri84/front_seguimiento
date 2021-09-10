import { UserLogin } from 'src/app/models/userlogin.model';
import { LoginService } from '../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { CuentaUsuario } from '../models/usuario.model';
import { Session } from 'src/app/models/session.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public userLogin: UserLogin;
  public cuentaUsuario: CuentaUsuario;
  public session: Session;
  public loadingVisible = false;

  constructor(
    public router: Router,
    public _loginService: LoginService,
    public _usuarioService: UsuarioService
  ) {
    this.userLogin = new UserLogin("", "");
    this.session = new Session();
  }

  ngOnInit() {
  }

  loginUser(isValid: any) {
    if (isValid) {
      this.loadingVisible = true;
      this._loginService
        .loginUsuario(this.userLogin)
        .subscribe(
          (result) => {
            this.cuentaUsuario = result.usuario;
            this.session.access_token = result.token;
            this.session.user = result.usuario;
            this._usuarioService.currentUser = result.usuario;
            this._usuarioService.setCurrentSession(this.session);
            this.router.navigate(['resultados']);
            this.loadingVisible = false;
          },
          (error) => {
            this.loadingVisible = false;
            if (error) {
              Swal.fire({
                icon: 'error',
                title: 'Iniciar sesión',
                text: 'Error al iniciar sesión, usuario o clave invalido!',
              })
            }
          }
        );
    }
  }

}
