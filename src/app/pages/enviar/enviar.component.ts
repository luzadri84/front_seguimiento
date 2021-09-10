import Swal from "sweetalert2";
import { CuentaUsuario } from 'src/app/models/usuario.model';
import { Component, OnInit } from "@angular/core";
import { FormularioService } from "src/app/services/formulario/formulario.service";
import { UsuarioService } from "src/app/services/service.index";
import { ActivatedRoute, Router } from "@angular/router";
import { Proyecto } from "src/app/models/proyecto.model";
import { Session } from "src/app/models/session.model";
import { Errores, RespuestaEnvio } from "src/app/models/respenviar.model";

@Component({
    selector: 'app-enviar',
    templateUrl: './enviar.component.html',
    styleUrls: ['./enviar.component.css']
})
export class EnviarComponent implements OnInit {
    public _currentUser: CuentaUsuario;
    public proId: any;
    public existeProyecto: boolean;
    public loadingVisible = false;
    public proyecto: Proyecto;
    public errores : Array<Errores>[];
    
    constructor(public _formualrioService: FormularioService,
        public _usuarioService: UsuarioService,
        private route: ActivatedRoute,
        public router: Router) {
    }

    ngOnInit() {
        //Get id proyecto
        this.route.queryParamMap
            .subscribe((params) => {
                this.proId = params.get("proId");
            }
        );
        this.errores = [];
        this.proyecto = new Proyecto(
            this.proId,
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
        this.existeProyecto = false;
        this.validarProyectoSession();
    }

    validarProyectoSession() {
        let session: Session = this._usuarioService.getCurrentSession();
        if (this.proId !== null) {
            this.getProyecto(this.proId);
            this.existeProyecto = true;
        } else {
            if (session.proId !== null && session.proId !== undefined) {
                this.existeProyecto = true;
                this.proId = session.proId;
                this.getProyecto(this.proId);
            } else {
                Swal.fire(
                    'Importante',
                    'Seleccione el proyecto que desea trabajar',
                    'info'
                );
                this.router.navigate(['/dashboard']);
            }
        }
    }

    getProyecto(id: number){
        this.loadingVisible = true;
        this._formualrioService
            .cargarProyectoById(id)
            .subscribe(
                (result: Proyecto) => {
                    this.loadingVisible = false;
                    this.proyecto = result;
                    if(this.proyecto.proEstado === 'E'){
                        Swal.fire(
                            'Importante',
                            'El proyecto se encuentra en estado envíado!',
                            'info'
                        );
                        this.router.navigate(['/dashboard']);
                    }
                },
                (error) => {
                    this.loadingVisible = false;
                    console.log(<any>error);
                }
            );
    }

    enviar(){
        this.loadingVisible = true;
        this._formualrioService
            .EnviarProyecto(this.proId)
            .subscribe(
                (result: RespuestaEnvio) => {
                    this.loadingVisible = false;
                    if(result.resultado) {
                        Swal.fire(
                            'Importante',
                            'Proyecto envíado correctamente!',
                            'info'
                        );
                        this.router.navigate(['/dashboard']);
                    }
                    else {
                        this.errores = result.errores;
                    }
                },
                (error) => {
                    this.loadingVisible = false;
                    console.log(<any>error);
                }
            );
    }

}