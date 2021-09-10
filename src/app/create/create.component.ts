import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/services/administracion/administracion.service';
import { LoginService } from 'src/app/services/login/login.service';
import {
    CrearUsuario
} from 'src/app/models/create.user.model';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    usuario: CrearUsuario;
    tipoEntidadProponente: Array<any>;
    public loadingVisible: boolean = false;

    constructor(public _administracionService: AdministracionService,
        public _loginService: LoginService,
        public router: Router) {
        this.usuario = new CrearUsuario(null, null, "", "", "", "", "");
    }

    ngOnInit() {
        this.cargarTiposEntidad();
    }

    cargarTiposEntidad() {
        this.loadingVisible = true;
        this._administracionService
            .cargarTipoEntidadProponente()
            .subscribe(
                (result) => {
                    this.loadingVisible = false;
                    this.tipoEntidadProponente = result;
                },
                (error) => {
                    this.loadingVisible = false;
                    console.log(<any>error);
                }
            );
    }

    crearUsuario(isValid: any) {
        if (isValid) {
            if(this.usuario.contrasena === this.usuario.confcontrasena) {
                this.loadingVisible = true;
                let item = this.tipoEntidadProponente.find(p => p.tipId === this.usuario.tipIdEntidad)
                this.usuario.tipoEntidad = item.tipTipId;
                this._loginService
                    .crearUsuario(this.usuario)
                    .subscribe(
                        (result) => {
                            this.loadingVisible = false;
                            if (result.resultado) {
                                Swal.fire('Crear usuario', 'Usuario creado correctamente, por favor confirmar el usuario ingresando al correo electrónico registrado!', 'success');
                                this.router.navigate(['login']);
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
                                    text: 'Error al intentar crear el usuario!',
                                })
                            }
                        }
                    );
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La contraseña no coincide con la confirmación.',
                })
            }
        }
    }
}
