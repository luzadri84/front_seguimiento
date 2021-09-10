import { Component, OnInit } from '@angular/core';
import { UsuarioService, SidebarService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';
import { Session } from 'src/app/models/session.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: User;
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
  currentSession: Session;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = new User();
  }

  salir() {
    this._usuarioService.logout();
  }

  ngOnInit() {
    const user: any = this._usuarioService.getCurrentUser();
    this.usuarioNombre = user.cuentausuariousuario;
    this.email = user.cuentausuarioemail;

    this.roles = user.perfilesCuentausuario;
    if (this.roles.length > 0) {
      this.role = this.roles[0].perfil.perfilnombre;
    }
  }


}
