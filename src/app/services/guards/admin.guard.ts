import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService) {
  }
  canActivate() {
    let usuario: User;
    let roles: any;
    const user: any = this._usuarioService.getCurrentUser();
    usuario = JSON.parse(user);
    roles = usuario.Perfiles;
    if (roles.length > 0) {
      if (roles[0].PER_ID === 1) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
