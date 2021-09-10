import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { UsuarioService } from 'src/app/services/service.index';
import { CuentaUsuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login/login.service';
import { FormularioService } from 'src/app/services/formulario/formulario.service';
import { Proponente } from 'src/app/models/proponente.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: CuentaUsuario;
  roles: any;
  role: string;
  public proponente: Proponente;
  public envioPro: boolean = true;

  constructor(
    public _loginService: LoginService,
    public _usuarioService: UsuarioService,
    public _formualrioService: FormularioService) {
    this.usuario = new CuentaUsuario(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  }

  ngOnInit() {
    this.init();
  }

  init() {
    const user: any = this._usuarioService.getCurrentUser();
    this.usuario = user;

    this.roles = user.perfilesCuentausuario;
    if (this.roles.length > 0) {
      this.role = this.roles[0].perfil.perfilnombre;
    }
    //Determinar si tiene un proyecto enviado para bloquear el botón de guardar al cambiar el correo
    this.getProponente(Number(user.personaid));
  }

  getProponente(id: number) {
    this._formualrioService
      .cargarProponenteById(id)
      .subscribe(
        (result: Proponente) => {
          this.proponente = result;
          this.proponente.appProyectos.forEach(element => {
            if (element.proEstado === 'E') {
              this.envioPro = false;
            }
          });
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  guardar(user: any) {
    this.usuario.cuentausuarioemailnuevo = user.emailNuevo;
    this.usuario.cuentausuarioemailnuevoconf = user.emailNuevoConf;
    if (this.usuario.cuentausuarioemail === this.usuario.cuentausuarioemailnuevoconf) {
      Swal.fire({
        icon: 'error',
        title: 'Actualizar usuario',
        text: 'El correo electrónico nuevo es igual al actual.',
      });
    }
    else {
      if (this.usuario.cuentausuarioemailnuevo === this.usuario.cuentausuarioemailnuevoconf) {
        this._loginService
          .actualizarUsuario(this.usuario)
          .subscribe(
            (result) => {
              if (result === true) {
                Swal.fire('Actualizar usuario', 'Usuario actualizado correctamente, por favor ingresar nuevamente.', 'success');
                this._usuarioService.logout();
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Actualizar usuario',
                  text: 'Error al actualizar el correo electrónico del usuario, es probable que ya exista una cuenta con el correo ingresado.',
                });
              }
            },
            (error) => {
              if (error) {
                Swal.fire({
                  icon: 'error',
                  title: 'Actualizar usuario',
                  text: 'Error al actualizar el correo electrónico del usuario.',
                });
              }
            }
          );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo electrónico nuevo no coincide con la confirmación.',
        });
      }
    }
  }

}
