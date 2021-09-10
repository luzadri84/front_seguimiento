import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/models/session.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import "devextreme/localization/globalize/number";
import "devextreme/localization/globalize/date";
import "devextreme/localization/globalize/currency";
import "devextreme/localization/globalize/message";
import Swal from 'sweetalert2';
import {
  AppDocumentosTipoEntidades
} from '../../models/formulariob.model';
import { FormularioService } from 'src/app/services/formulario/formulario.service';
import { environment } from 'src/environments/environment';
import notify from 'devextreme/ui/notify';
import { Proyecto } from 'src/app/models/proyecto.model';
@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  public proyecto: Proyecto;
  value: any[] = [];
  url: string = environment.URL_API + "parametria/documentos"
  uploadUrl: string = "";
  appDocumentosTipoEntidades: AppDocumentosTipoEntidades[];
  prodId: any;
  headers: any;

  constructor(
    public _formularioService: FormularioService,
    private route: ActivatedRoute,
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    // Se obtiene el proId de la ruta
    this.route.queryParamMap.subscribe((params) => {
      this.prodId = params.get("proId");
    });
    this.proyecto = new Proyecto(
      this.prodId,
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
      '2020-12-24',
      null
    );
    let session: Session = this._usuarioService.getCurrentSession();
    this.headers = { 'Authorization': 'Bearer ' + session.access_token };
    if (session.proId !== null && session.proId !== undefined) {
      this.prodId = session.proId;
      this.getProyecto(this.prodId);
      this.cargarDocumentosTipoEntidades(this.prodId);
    } else {
      Swal.fire(
        "Importante",
        "Seleccione el proyecto que desea trabajar",
        "info"
      );
      this.router.navigate(["/dashboard"]);
    }
  }

  getProyecto(id: number) {
    this._formularioService
      .cargarProyectoById(id)
      .subscribe(
        (result: Proyecto) => {
          this.proyecto = result;
          if (this.proyecto.proEstado === 'E') {
            Swal.fire(
              'Importante',
              'El proyecto se encuentra en estado envíado!',
              'info'
            );
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  onValueChanged(e: any, tdoId: any, archivoNombreAnterior: any, cantidadHojas: number) {
    if (cantidadHojas == 0) {
      notify(
        {
          message: 'La cantidad de hojas no debe ser cero',
          position: {
            my: 'center top',
            at: 'center top',
          },
        },
        'error',
        3000
      );
      return;
    }
    else {
      if (archivoNombreAnterior == "")
        archivoNombreAnterior = "noexiste"
      this.uploadUrl = this.url + "/" + this.prodId + "/" + tdoId + "/" + archivoNombreAnterior + "/" + cantidadHojas;
      e.component.option("uploadUrl", this.uploadUrl);
    }
  }

  ocultar(idRuta: string) {
    let ocultValidacion: string;
    if (idRuta != "") {
      ocultValidacion = "inline"
    }
    else {
      ocultValidacion = "none";
    }
    return ocultValidacion;
  }

  cargarDocumentosTipoEntidades(idProd: number) {
    this._formularioService.GetAppDocumentosTipoEntidades(idProd).subscribe((res) => {
      this.appDocumentosTipoEntidades = res;

      for (var i = 0; i < this.appDocumentosTipoEntidades.length; i++) {
        this.appDocumentosTipoEntidades[i].numeroActualPaginas = 0;
      }
    })
  }

  changeFile() {
    this.cargarDocumentosTipoEntidades(this.prodId);
  }

  descargar(name: string) {
    this._formularioService
      .DescargarDocumento(this.prodId, name)
      .subscribe(
        (resultBlob: Blob) => {
          var downloadURL = URL.createObjectURL(resultBlob);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = name;
          link.click();
        },
        (error: any) => {
          if (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al intentar descargar el documento!',
            })
          }
        }
      );
  }
}
