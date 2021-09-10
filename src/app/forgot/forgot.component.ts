import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ForgotPassword } from "../models/forgot.model";
import { LoginService } from "../services/login/login.service";
import { UsuarioService } from "../services/service.index";
import Swal from "sweetalert2";

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.css'],
  })
  export class ForgotComponent implements OnInit {
    public forgotPassword: ForgotPassword;
    public loadingVisible: boolean = false;

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        public _loginService: LoginService,
        public _usuarioService: UsuarioService
      ) {
        this.forgotPassword = new ForgotPassword("", "");
    }

    ngOnInit() {

    }

    forgotPass(isValid: boolean){
        if(isValid) {
            if(this.forgotPassword.usuario === '' && this.forgotPassword.correo === '')
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Recuperar contraseña',
                    text: 'Ingrese su nombre de usuario o correo electrónico para recordar su contraseña.',
                });
            }
            else {
                this.loadingVisible = true;
                this._loginService
                    .recuperarClave(this.forgotPassword)
                    .subscribe(
                    (result) => {
                        this.loadingVisible = false;
                        if(result.resultado){
                            Swal.fire(
                                'Importante',
                                'Se envío un correo electrónico a: ' + result.mensaje + ' por favor ingrese y realice el proceso de cambio de contraseña.',
                                'info'
                            );
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Recuperar contraseña',
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
  }