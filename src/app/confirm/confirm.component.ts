import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../services/login/login.service";
import { UsuarioService } from "../services/service.index";
import Swal from "sweetalert2";

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css'],
  })
  export class ConfirmComponent implements OnInit {
    public guid: any;
    public linkvalido: boolean;
    public mensaje: string;

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        public _loginService: LoginService,
        public _usuarioService: UsuarioService
      ) {
        this.linkvalido = false;
        this.mensaje = "";
    }

    ngOnInit() {
        //Get id proyecto
        this.route.queryParamMap
            .subscribe((params) => {
                this.guid = params.get("guid");
            }
        );
        this.linkValido();
    }

    linkValido() {
        if(this.guid !== null) {
            this._loginService
                .confirmarUsuario(this.guid)
                .subscribe(
                (result) => {
                    this.linkvalido = result.resultado;
                    this.mensaje = result.mensaje;
                },
                (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Confirmar usuario',
                        text: 'Error al intentar confirmar usuario!',
                    });
                    this.mensaje = 'Error al intentar confirmar usuario!';
                }
            );
        }
    }
    
  }