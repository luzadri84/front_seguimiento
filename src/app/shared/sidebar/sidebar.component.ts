import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Session } from '../../models/session.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuarioNombre: string;
  email: string;
  roles: any;
  role: string;
  currentSession: Session;
  public proId: any;
  public vigenciaFutura: any;
  

  constructor(private router: Router, private route: ActivatedRoute, public _usuarioService: UsuarioService) {
  }

  ngOnInit() {
    const user: any = this._usuarioService.getCurrentUser();
    this.usuarioNombre = user.cuentausuariousuario;
    this.email = user.cuentausuarioemail;
    this.roles = user.perfilesCuentausuario;
    if (this.roles.length > 0) {
      this.role = this.roles[0].perfil.perfilnombre;
    }
    this.route.queryParamMap
            .subscribe((params) => {
                this.proId = params.get("proId");
            }
        );
  }

  onReload() {
    this.router.navigate(['/resultados'], { relativeTo: this.route });
    this.currentSession = this._usuarioService.getCurrentSession();
  }


  accion() {
    alert("sali");
  }

  

}