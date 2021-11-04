import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Seguimientos } from '../models/seguimiento.model';
import { AdministracionService } from '../services/administracion/administracion.service';
import { FormularioService } from '../services/formulario/formulario.service';
import { Session } from 'src/app/models/session.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  public loadingVisible = false;
  actividades: Array<any>;
  seguimiento: Seguimientos = new Seguimientos();
  segid:number = 0;
  public proId: any;
  public session: Session;
  [x: string]: any;
;
  constructor(public _administracionService: AdministracionService,
    public _formualrioService: FormularioService,
    private route: ActivatedRoute,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
      
    let session: Session = this._usuarioService.getCurrentSession();
        this.route.queryParamMap.subscribe((params) => {
            this.proId = params.get("proId");
                if(this.proId == null)
                {
                    session.proId = null;
                }
                else
                {
                    this.cargarSeguimiento(this.proId);
                }
            });
    this.cargarActividades();
    
  }
  
  cargarActividades() {
    debugger;
    this.loadingVisible = true;
    this._administracionService
        .GetActividades()
        .subscribe(
            (result) => {
                this.loadingVisible = false;
                this.actividades = result;
            },
            (error) => {
                this.loadingVisible = false;
                console.log(<any>error);
            }
        );
    }

cargarSeguimiento(IdProd:number){
    this._formualrioService.cargarSeguimiento(IdProd).subscribe((res) => {
      this.historicoSeguimiento = res;
    });
  }

crearSeguimiento(isValid: boolean){
  if(isValid) {
          this.loadingVisible = true;
          this.seguimiento.proId = this.proId;
          //this.formularioA = new FormularioA(this.proponente, this.proyecto);
          this._formualrioService
              .ActualizarSeguimiento(this.seguimiento)///this.formularioA)
              .subscribe(
                  (result: any) => {
                      this.loadingVisible = false;
                      if (result.resultado) {
                          Swal.fire('Seguimiento', 'El registro de seguimiento se guardó exitosamente!', 'success');
                          this.segid = result.id;
                          this.cargarSeguimiento(this.proId);
                      }
                      else {
                          Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: result.mensaje,
                          })
                      }
                  },
                  (error) => {
                      this.loadingVisible = false;
                      if (error) {
                          Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Error al intentar guardar la información!',
                          })
                      }
                  }
              );
     
  }
  else {
      Swal.fire({
          icon: 'error',
          title: 'Crear proponente',
          text: 'Existen campos vacios sin diligenciar!',
      })
  }
}
}
