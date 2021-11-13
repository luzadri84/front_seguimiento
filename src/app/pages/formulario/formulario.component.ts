import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/services/administracion/administracion.service';
import { FormularioService } from 'src/app/services/formulario/formulario.service';
import Swal from "sweetalert2";
import { UsuarioService } from '../../services/service.index';
import { CuentaUsuario } from 'src/app/models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Proponente, Proponentes } from 'src/app/models/proponente.model';
import { TiposEntidades } from 'src/app/models/tipos.entidad.model';
import { FormularioA } from 'src/app/models/formularioA.model';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Session } from 'src/app/models/session.model';
import { environment } from '../../../environments/environment'

@Component({
    selector: 'app-formularioA',
    templateUrl: './formulario.component.html',
    styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
    public _currentUser: CuentaUsuario;
    public proId: any;
    public vigenciaFutura: any;
    public existeProyecto: boolean;
    listDepartamentos: Array<any>;
    listMunicipios: Array<any>;
    listDepartamentosPro: Array<any>;
    listMunicipiosPro: Array<any>;
    listDepartamentosBanco: Array<any>;
    listMunicipiosBanco: Array<any>;
    listEntFinancieras: Array<any>;
    public formularioA: FormularioA;
    proponente: Proponentes = new Proponentes();
    public proyecto: Proyecto;
    public loadingVisible = false;
    tipoEntidadProponente: Array<any>;
    public session: Session;
    permiteedicion: boolean  = false;

    constructor(public _administracionService: AdministracionService,
        public _formualrioService: FormularioService,
        public _usuarioService: UsuarioService,
        private route: ActivatedRoute,
        public router: Router) {
    }

    ngOnInit() {
        let session: Session = this._usuarioService.getCurrentSession();
        this.route.queryParamMap.subscribe((params) => {
            this.proId = params.get("proId");
            this.vigenciaFutura = params.get("vigenciaFutura");
                if(this.proId == null)
                {
                    session.proId = null;
                }
                if(session.vigenciaFutura == null)
                {
                    session.vigenciaFutura = this.vigenciaFutura;
                    
                }

            }

            
        );
        this.existeProyecto = false;
        
        if (this.proId !== null) {
        this.permiteedicion = session.user.perfilesCuentausuario[0].perfil.permiteeditar; 
        
        debugger;
        this.getProponente(this.proId);
        this.existeProyecto = true;
        } else {
        if (session.proId !== null && session.proId !== undefined) {
            
            this.proId = session.proId;
            this.getProponente(this.proId);
            this.existeProyecto = true;
        } 
        }
        
        //Listas
        this.cargarTiposEntidad();
        this.cargarDepartamentos();
        this.cargarDepartamentosPro();
        this.cargarDepartamentosBanco();
        this.cargarEntFinancieras();
       
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
    validarProyectoSession(tieneProyectos: boolean) {
        let session : Session = this._usuarioService.getCurrentSession();
        if(this.proId !== null) {
            this.existeProyecto = true;
            //this.getProyecto(this.proId);
        }
        else {
            if(session.proId !== null && session.proId !== undefined) {
                this.existeProyecto = true;
                this.proId = session.proId;
                //this.getProyecto(this.proId);
            }
            // else {
            //     if(tieneProyectos) {
            //         Swal.fire(
            //             'Importante',
            //             'Seleccione el proyecto que desea trabajar',
            //             'info'
            //         );
            //         this.router.navigate(['/dashboard']);
            //     }
            // }
        }
    }

    getProponente(id: number) {
        //alert("form " + id);
        this._formualrioService
            .cargarProponenteById(id)
            .subscribe(
                (result: Proponente) => {
                    this.proponente = result;

                    let session : Session = this._usuarioService.getCurrentSession();
                    
                    //alert("form2 " + id);

                    if(id !== null) {
                        this.existeProyecto = true;
                        session.proId = this.proId;
                        //this._usuarioService.setCurrentSession(this.session);
                        //this.getProyecto(this.proId);
                    }
                   
                    //this.validarProyectoSession(this.proponente.appProyectos.length > 0 && this.proponente.appProyectos.length === this.proponente.tip.tipNumeroProyectos);
                   //this.proyecto.proIdProponente = this.proponente.proId;
                    if(this.proponente.proLugarExpedicionDocumentoRepresentanteLegal !== null) {
                        //Cargar dep y mun de expedición del documento del representante legal
                        if(this.proponente.proLugarExpedicionDocumentoRepresentanteLegal !== null) {
                            this.proponente.proLugarExpDocRepLegDep = this.proponente.proLugarExpedicionDocumentoRepresentanteLegal.substring(0, 2);
                            this.cargarMunicipios(this.proponente.proLugarExpDocRepLegDep);
                        }
                        //Cargar dep y mun del proponente
                        if(this.proponente.zonId !== null) {
                            this.proponente.zonDepId = this.proponente.zonId.substring(0, 2);
                            this.cargarMunicipiosPro(this.proponente.zonDepId);
                        }
                        //Igualar el correo a la confirmación
                        this.proponente.proConfirmarCorreo = this.proponente.proCorreoElectronicoRepresentanteLegal;
                    }
                },
                (error) => {
                    console.log(<any>error);
                }
            );
    }

    // getProyecto(id: number){
    //     this._formualrioService
    //         .cargarProyectoById(id)
    //         .subscribe(
    //             (result: Proyecto) => {
    //                 this.proyecto = result;
    //                 if(this.proyecto.proEstado === 'E'){
    //                     Swal.fire(
    //                         'Importante',
    //                         'El proyecto se encuentra en estado envíado!',
    //                         'info'
    //                     );
    //                     this.router.navigate(['/dashboard']);
    //                 }
    //                 //Cargar dep y mun del banco
    //                 if(this.proyecto.zonIdEntidadBancaria != null) {
    //                     this.proyecto.zonIdEntidadBancariaDep = this.proyecto.zonIdEntidadBancaria.substring(0, 2);
    //                     this.cargarMunicipiosBanco(this.proyecto.zonIdEntidadBancariaDep);
    //                 }
    //             },
    //             (error) => {
    //                 console.log(<any>error);
    //             }
    //         );
    // }

    crearProponente(isValid: boolean){
        if(isValid) {
            if(this.proponente.proCorreoElectronicoRepresentanteLegal === this.proponente.proConfirmarCorreo) {
                this.loadingVisible = true;
                //this.formularioA = new FormularioA(this.proponente, this.proyecto);
                this._formualrioService
                    .guardarProponente(this.proponente)///this.formularioA)
                    .subscribe(
                        (result: any) => {
                            this.loadingVisible = false;
                            if (result.resultado) {
                                Swal.fire('Crear proponente', 'El proponente se guardó exitosamente!', 'success');
                                this.existeProyecto = true;
                                this.proId = result.id;
                                this.proponente.proId = result.id;
                                this.session.proId = result.id;
                                this._usuarioService.setCurrentSession(this.session);
    
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
                    title: 'Oops...',
                    text: 'El correo electrónico no coincide con la confirmación.',
                })
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Crear proponente',
                text: 'Existen campos vacios sin diligenciar!',
            })
        }
    }

    changeDepartamentoExpRepLeg(){
        this.cargarMunicipios(this.proponente.proLugarExpDocRepLegDep);
        this.proponente.proLugarExpedicionDocumentoRepresentanteLegal = null;
    }

    changeDepartamentoBanco(){
        this.cargarMunicipiosBanco(this.proyecto.zonIdEntidadBancariaDep);
        this.proyecto.zonIdEntidadBancaria = null;
    }

    changeDepartamentoPro(){
        this.cargarMunicipiosPro(this.proponente.zonDepId);
        this.proponente.zonId = null;
    }

    cargarDepartamentos() {
        this._administracionService
            .cargarDepartamentos()
            .subscribe(
                (result) => {
                    this.listDepartamentos = result;
                },
                (error) => {
                    console.log(<any>error);
                }
            );
    }

    cargarMunicipios(idDep: any) {
        this._administracionService
            .cargarMunicipios(idDep)
            .subscribe(
                (result) => {
                    this.listMunicipios = result;
                },
                (error) => {
                    console.log(<any>error);
                }
            );
    }

    cargarDepartamentosPro() {
        this._administracionService
            .cargarDepartamentos()
            .subscribe(
                (result) => {
                    this.listDepartamentosPro = result;
                },
                (error) => {
                    console.log(<any>error);
                }
            );
    }

    cargarMunicipiosPro(idDep: any) {
        this._administracionService
            .cargarMunicipios(idDep)
            .subscribe(
                (result) => {
                    this.listMunicipiosPro = result;
                },
                (error) => {
                    console.log(<any>error);
                }
            );
    }

    cargarDepartamentosBanco() {
        this._administracionService
            .cargarDepartamentos()
            .subscribe(
                (result) => {
                    this.listDepartamentosBanco = result;
                },
                (error) => {
                    console.log(<any>error);
                }
            );
    }

    cargarMunicipiosBanco(idDep: any) {
        this._administracionService
            .cargarMunicipios(idDep)
            .subscribe(
                (result) => {
                    this.listMunicipiosBanco = result;
                },
                (error) => {
                    console.log(<any>error);
                }
            );
    }

    cargarEntFinancieras() {
        this._administracionService
            .cargarEntidadesFinancieras()
            .subscribe(
                (result) => {
                    this.listEntFinancieras = result;
                },
                (error) => {
                    console.log(<any>error);
                }
            );
    }

    // imprimir(){
    //     window.open(environment.URL_REPORTS + "Pages/ParteA.aspx?Id=" + this.proId, "_blank");
    // }
}