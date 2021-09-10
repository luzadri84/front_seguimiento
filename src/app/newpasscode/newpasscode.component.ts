import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ChangePassword } from "../models/change.model";
import { LoginService } from "../services/login/login.service";
import { UsuarioService } from "../services/service.index";
import Swal from "sweetalert2";

@Component({
    selector: 'app-newpasscode',
    templateUrl: './newpasscode.component.html',
    styleUrls: ['./newpasscode.component.css'],
  })
  export class NewPasscodeComponent implements OnInit {
    public change_password: ChangePassword;
    public guid: any;
    public linkvalido: boolean;
    public mensaje: string;
    public loadingVisible: boolean = false;

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        public _loginService: LoginService,
        public _usuarioService: UsuarioService
      ) {
        this.change_password = new ChangePassword("", "", "");
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
            this.loadingVisible = true;
            this._loginService
                .linkValido(this.guid)
                .subscribe(
                (result) => {
                    this.loadingVisible = false;
                    this.linkvalido = result.resultado;
                    this.mensaje = result.mensaje;
                },
                (error) => {
                    this.loadingVisible = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'Recuperar contraseña',
                        text: 'Error al recuperar la contraseña!',
                    });
                }
            );
        }
    }

    changePasswordUser(user: any){
        if(user.clave !== user.claveConf) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La contraseña no coincide con la confirmación.',
            });
        }
        else {
            this.loadingVisible = true;
            this.change_password.guid = this.guid;
            this.change_password.clave = user.claveConf;
            this._loginService
                .changePassword(this.change_password)
                .subscribe(
                (result) => {
                    this.loadingVisible = false;
                    if(result.resultado){
                        this.router.navigate(['login']);
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Cambiar contraseña',
                            text: result.mensaje,
                        });
                    }
                },
                (error) => {
                    this.loadingVisible = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'Recuperar contraseña',
                        text: 'Error al recuperar la contraseña!',
                    });
                }
            );
        }    
        
    }
  }