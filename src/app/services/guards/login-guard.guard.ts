import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public _router: Router) {
  }

  canActivate() {
    if (this._usuarioService.estalogueado()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
