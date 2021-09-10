import { Component } from "@angular/core";
import { UsuarioService } from "src/app/services/service.index";
import { Router } from "@angular/router";
import { AdministracionService } from "../../services/administracion/administracion.service";
import { FormularioService } from "../../services/formulario/formulario.service";
import { CuentaUsuario } from "src/app/models/usuario.model";
import { Proponente } from "src/app/models/proponente.model";
import { TiposEntidades } from "src/app/models/tipos.entidad.model";
import Swal from "sweetalert2";
import { Session } from "src/app/models/session.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent {
  public session: Session;
  public vigencia: number;
  public tipoEntidad: string;
  public proponente: Proponente;
  public loadingVisible: boolean = false;

  constructor(
    public _usuarioService: UsuarioService,
    public _administracionbService: AdministracionService,
    public _formularioservice: FormularioService,
    public router: Router) {

  }

  ngOnInit() {
    var today = new Date();
    var year = today.getFullYear() + 1;
    this.vigencia = year;
    const user: CuentaUsuario = this._usuarioService.getCurrentUser();
    this.session =  this._usuarioService.getCurrentSession();
    this.proponente = new Proponente(
      null,
      null,
      null, 
      null,
      null,
      null,
      null, 
      null, 
      null, 
      null, 
      null, 
      null, 
      null, 
      null, 
      null,
      null, 
      null,
      null, 
      null, 
      null, 
      null, 
      null, 
      null, 
      null, 
      null,
      null, 
      null, 
      null, 
      null, 
      null, 
      null, 
      null, 
      null, 
      null, 
      null,
      null,
      null,
      new TiposEntidades(null, null, null, null, 0, '2020-12-24', ''),
      []);
    this.getProponente(Number(user.personaid));
  }

  crearProyecto() {
    this.session.proId = null;
    this._usuarioService.setCurrentSession(this.session);
    this.router.navigate(['formulario']);
  }

  getProponente(id: number) {
    this.loadingVisible = true;
    this._formularioservice
      .cargarProponenteById(id)
      .subscribe(
        (result: Proponente) => {
          this.loadingVisible = false;
          this.proponente = result;
          this.tipoEntidad = result.tip.tipNombre;
        },
        (error) => {
          this.loadingVisible = false;
          let _error = '';
          if(error){
            if(error.error) {
              _error = 'Error al cargar los datos del proponente. ' + error.error.errores[0].descripcion;
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: _error,
              });
            }
          }
        }
      );
  }

  seleccionarRegistro(data: any) {
    this.loadingVisible = true;
    this.session.proId = data.proId;
    this._usuarioService.setCurrentSession(this.session);
    this.router.navigate(['/formulario'], { queryParams: { proId: data.proId } });
    this.loadingVisible = false;
  }

  imprimirParteB(data: any){
    window.open(environment.URL_REPORTS + "Pages/ParteB.aspx?Id=" + data.proId, "_blank");
  }

}