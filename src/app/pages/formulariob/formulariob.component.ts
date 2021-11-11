import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ArrayStore from 'devextreme/data/array_store';
import moment from 'moment';
import { Session } from 'src/app/models/session.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import "devextreme/localization/globalize/number";
import "devextreme/localization/globalize/date";
import "devextreme/localization/globalize/currency";
import "devextreme/localization/globalize/message";
import esMessages from "devextreme/localization/messages/es.json";
import supplemental from 'devextreme-cldr-data/supplemental.json';
import esCldrData from 'devextreme-cldr-data/es.json';
import Globalize from 'globalize';
import Swal from 'sweetalert2';
import notify from 'devextreme/ui/notify';
import validationEngine from 'devextreme/ui/validation_engine';
import {
  Areas,
  Componentes,
  Cronograma,
  Departamentos,
  editorOptions,
  FormCompProyecto,
  FormInfoProyecto,
  FormTrayectoria,
  FormPresupuesto,
  FormularioB,
  Lineas,
  Metas,
  Municipios,
  Proyecto,
  Temas,
  TemasbyProyectos,
  ProyectoActividadesObligatorias,
  ActividadesObligatorias,
  IndicadorLineaCategoriaMunicipio,
  TrayectoriaProyecto, AppPresupuestoDetalleTipo, AppPresupuestoDetalle, Indicadores, IndicadoresbyLinea, ValoresIndicador, ValoresIndicadorLineaCategioriaMunicipio, AppBeneficiarios, Vigencia, ProyectoSeguimiento
} from '../../models/formulariob.model';
import { AdministracionService } from '../../services/administracion/administracion.service';
import { FormularioService } from '../../services/formulario/formulario.service';
import { threadId } from 'worker_threads';


@Component({
  selector: "app-formulariob",
  templateUrl: "./formulariob.component.html",
  styleUrls: ["./formulariob.component.css"],
})
export class FormularioBComponent implements OnInit {
  [x: string]: any;
  proId: any;
  public loadingVisible = false;
  vigencia: Vigencia[] = [];
  listaLineas: Lineas[] = [];
  listaAreas: Areas[] = [];
  listaTemas: Temas[] = [];
  //listaCronograma: Cronograma[] = [];
  listaDepartamentos: Departamentos[] = [];
  listaMunicipios: Municipios[] = [];
  //listaMetas: Metas[] = [];
  //listaIndicadores: Indicadores[] = [];
  //listaIndicadoresLinea: IndicadoresbyLinea[] = [];
  //listaValoresIndicador: ValoresIndicador[] = [];
  //listaProyectoValoresIndicador: ValoresIndicador[] = [];
  //listaProyectoActividadesObligatorias: ProyectoActividadesObligatorias[] = [];
  //listaActividadesObligatorias: ActividadesObligatorias[] = [];
  //listaIndicadoresLineaMunicipioCategoria: IndicadorLineaCategoriaMunicipio[] = [];
  //listaValoresIndicadoresLineaCategoriaMunicipio: ValoresIndicadorLineaCategioriaMunicipio [] = [];

  //estadoTemasbyProyecto: TemasbyProyectos[] = [];
  //savedTemasbyProyecto: TemasbyProyectos[] = [];
  //partesProyecto: any[] = [];
  itemsArea = [];
  linea: Lineas;
  dataArea: ArrayStore;
  lineaDescripcion: string;
  // formInfoProyecto: FormInfoProyecto;
  // formTrayectoria: FormTrayectoria;
  // formCompProyecto: FormCompProyecto;
  // formPresupuesto: FormPresupuesto;
  componentes: Componentes;
  //cronograma: Cronograma;
  //proyectoActividadesObligatorias: ProyectoActividadesObligatorias;
  //actividadesObligatorias: ActividadesObligatorias;
  //indicadoresLinea: IndicadoresbyLinea;
  //valoresIndicadores: ValoresIndicador;
  //indicadoresLineaCategoriaMunicipio: IndicadorLineaCategoriaMunicipio;
  //valoresIndicadoresLineaCategoriaMunicipio: ValoresIndicadorLineaCategioriaMunicipio;

  //temasbyproyecto: TemasbyProyectos;
  proyecto: ProyectoSeguimiento = new ProyectoSeguimiento();
  //temas: Temas;
  //metas: Metas;
  //formularioB: FormularioB;

  // lineaSeleccionada = false;
  // mostrarTemas: boolean = false;
  // proExiste: boolean = false;
  // proFechasExiste: boolean = false;
  // checklengthTemas: boolean = true;
  fechaInicioProyecto: Date;
  // fechaFinalProyecto: Date;
  // fechaRestriccionInicioDP1: Date;
  // fechaRestriccionFinalDP1: Date;
  // fechaRestriccionInicioDP2: Date;
  // fechaRestriccionFinalDP2: Date;
  year: number;

  // editorOptions: editorOptions;
  // dbisValidInicio: boolean = true;
  // dbisValidFinal: boolean = true;
  // dbisValidActInicio: boolean = true;
  // dbisValidActFinal: boolean = true;

  // flagIncentivos: boolean = false;
  // flagShowIncentivos: boolean = false;
  // checkedRB: boolean = false;
  // showPopup: boolean = false;

  ListaTrayectoria = [];
  listaDetalleTipo = [];
  ListaTipoTrayectoria = [];
  ListaTrayectoriaTipoTrayectoria = [];
  listaILMC = [];
  listaVILMC = [];
  // GuardarTrayectoriaL: string;
  // respuestasTrayectoria: TrayectoriaProyecto[] = [];
  // trayectoriaProyecto: TrayectoriaProyecto = new TrayectoriaProyecto();
  // appBeneficiarios: AppBeneficiarios = new AppBeneficiarios();

  arreglo = [];
 // appPresupuestoDetalleTipo: AppPresupuestoDetalleTipo[];
  //appPresupuestoDetalle: AppPresupuestoDetalle[];
  selectTextOnEditStart: boolean = true;
  startEditAction: string = "click";
  errorValidacion: string = "";
  errorValidacionTope: string = "";
  permiteedicion: boolean  = false;
  //suma: string = "10";
  // sumaTotal: number = 0;
  // granSuma: number = 0;
  // mostrarsumatoria: boolean = false;
  // colortex = "rgb(247, 62, 6);"
  // idTrayectoria: number = 0;
  // esVisibleTrayectoria: boolean = true;
  // seHabilitaGuardarPresupuesto: boolean = false;

  // maxLengthTA: number = 8000;
  // maxLengthTA1: number = 5000;
  // countAreas: number = 0;
  // recursosPropios: boolean = false;

  constructor(
    public _formularioService: FormularioService,
    public _administracionService: AdministracionService,
    private route: ActivatedRoute,
    public _usuarioService: UsuarioService,
    public router: Router
  ) {

    Globalize.load(supplemental);
    Globalize.load(esCldrData);
    Globalize.loadMessages(esMessages);
    Globalize.locale(navigator.language);
    
    // this.iniFormInfoProyecto();
    // this.iniFormTrayectoria();
    // this.iniFormCompProyecto();
    // this.iniPresupuesto();
    this.fechaInicioProyecto = null;
    // this.fechaFinalProyecto = null;

    this.year = new Date().getFullYear();

    // this.editorOptions = new editorOptions(
    //   this.fechaInicioProyecto,
    //   this.fechaFinalProyecto
    // );
  }

  ngOnInit() {
    this.iniProyecto();
    //this.iniComponentes();
    //this.iniCronograma();
    //this.iniTemas();
    //this.iniValoresIndicador();
    //this.iniValoresInidicadoresLineaCategoriaMunicipio();
    
    this.cargarDepartamentos();
    this.cargarLineas();
    this.cargarAreas();
    //this.cargarMetasbyProyecto();
    //this.cargarActividadesObligatorias();
    //this.cargarLineas();
    //this.cargarTrayectoria();
    //this.cargarTipoTrayectoria();
    //this.cargarIndicadores();
    //this.cargarIndicadoresLineaCategoriaMunicipio();

    this._formularioService.GetVigencia().subscribe((res) => {
      this.vigencia = res;
    })

    // Se obtiene el proId de la ruta
    this.route.queryParamMap.subscribe((params) => {
      this.proId = params.get("proId");
      //alert("parametro " + this.proId);
    });

    let session: Session = this._usuarioService.getCurrentSession();
    if (this.proId !== null) {
      this.getProyecto(this.proId);
      this.permiteedicion = session.user.perfilesCuentausuario[0].perfil.permiteeditar; 
      this.existeProyecto = true;
    } else {
      if (session.proId !== null && session.proId !== undefined) {
        this.proId = session.proId;
        this.getProyecto(this.proId);
        this.existeProyecto = true;
      } 
      else {
        Swal.fire(
          "Importante",
          "No ha ingresado la información del proponente",
          "info"
        );
        this.router.navigate(["/formulario"]);
      }
    }
    // this.partesProyecto.push(
    //   this.formInfoProyecto,
    //   //this.formTrayectoria,
    //   //this.formCompProyecto,
    //   //this.formPresupuesto
    // );

    //this.appBeneficiarios.benCaracteristicasPoblacion = '';
    //this.appBeneficiarios.benOtrasPersonasBeneficiadasDescripcion = '';
  }

  // #region Inicializar formularios parciales
  // iniFormInfoProyecto() {
  //   this.formInfoProyecto = {
  //     index: 0,
  //     NombreTituloPaso: "Información del proyecto",
  //   };
  // }

  // iniFormTrayectoria() {
  //   this.formTrayectoria = {
  //     index: 1,
  //     NombreTituloPaso: "Trayectoria",
  //   };
  // }

  // iniFormCompProyecto() {
  //   this.formCompProyecto = {
  //     index: 2,
  //     NombreTituloPaso: "Componentes del proyecto",
  //   };
  // }

  // iniPresupuesto() {
  //   this.formPresupuesto = {
  //     index: 3,
  //     NombreTituloPaso: "Presupuesto",
  //   };
  // }

  //#endregion

  // #region Inicializar objetos
   iniProyecto() {
    this.proyecto.proId = 0;
    this.proyecto.proNombre= "";
    this.proyecto.proIdProponente= null
    this.proyecto.proPersonaEncargadaProyecto= "";
    this.proyecto.proTelefonosPersonaEncargadaProyecto= "";
    this.proyecto.proCorreoPersonaEncargada= "";
    this.proyecto.linId= null
    this.proyecto.zonDepId= "";
    this.proyecto.zonId= "";
    this.proyecto.areId= null;
    this.proyecto.proFechaInicial= "";
    this.proyecto.proFechaFinal= "";
    //this.proyecto.proEstado= "";
    this.proyecto.proConvenio= "";
    this.proyecto.proNumeroRadicacion= "";
    this.proyecto.vigId= null;
    this.proyecto.proFechaLegalizacion= "";
    this.proyecto.proCelularPersonaEncargada= "";
    this.proyecto.proFechaPuntualInicial= "";
    this.proyecto.proFechaPuntualFinal= "";
  }

  // iniTemas() {
  //   this.temas = new Temas(null, null, null, false);
  // }

  // iniTemasProyecto() {
  //   this.temasbyproyecto = new TemasbyProyectos(null, this.proId);
  // }

  // iniComponentes() {
  //   this.componentes = new Componentes(
  //     this.proId,
  //     "",
  //     "",
  //     "",
  //     "",
  //     "",
  //     "",
  //     "",
  //     "",
  //     "",
  //     "",
  //     "",
  //     "2020-12-24",
  //     "2020-12-24"
  //   );
  // }

  // iniCronograma() {
  //   this.cronograma = new Cronograma(
  //     null,
  //     "",
  //     "",
  //     this.proId,
  //     "",
  //     "",
  //     "",
  //     "",
  //     "2020-12-24",
  //     "2020-12-24"
  //   );
  // }

  // iniActividadesObligatorias() {
  //   this.actividadesObligatorias = new ActividadesObligatorias(
  //     null,
  //     "",
  //     "",
  //     ""
  //   );
  // }

  // iniProyectoActividadesObligatorias() {
  //   this.proyectoActividadesObligatorias = new ProyectoActividadesObligatorias(
  //     null,
  //     this.proId,
  //     null,
  //     "",
  //     "",
  //     "",
  //     "",
  //     "2020-12-24",
  //     ""
  //   );
  // }

  // iniInidcadoresLinea() {
  //   this.indicadoresLinea = new IndicadoresbyLinea(
  //     null,
  //     null,
  //     null,
  //     '',
  //     null,
  //     null,
  //     null,
  //     ''
  //   );
  // }

  // iniValoresIndicador() {
  //   this.valoresIndicadores = new ValoresIndicador(
  //     null,
  //     null,
  //     this.proId,
  //     null,
  //     '',
  //     '',
  //     '',
  //     '2020-12-24',
  //     null

  //   );
  // }

  // iniIndicadoresLineaCategoriaMunicipio() {
  //   this.indicadoresLineaCategoriaMunicipio = new IndicadorLineaCategoriaMunicipio(
  //     null,
  //     null,
  //     null,
  //     null,
  //     '',
  //     null,
  //     null,
  //     null,
  //     '',
  //     '',
  //     '',
  //     '2020-12-24',
  //     ''
  //   );
  // }

  // iniValoresInidicadoresLineaCategoriaMunicipio() {
  //   this.valoresIndicadoresLineaCategoriaMunicipio = new ValoresIndicadorLineaCategioriaMunicipio(
  //     null,
  //     null,
  //     null,
  //     null,
  //     '',
  //     '',
  //     '',
  //     '2020-12-24',
  //     ''
  //   );

  // }

  //#endregion

  /**
   * Método usado para cargar proyecto por Id
   * @param {number} id
   * @memberof FormularioBComponent
   */
  getProyecto(id: number) {

    //alert("proyecto" + id);
    this._formularioService
      .cargarProponenbyProyecto(id)
      .subscribe((res: ProyectoSeguimiento) => {
        this.proyecto = res;
        let session : Session = this._usuarioService.getCurrentSession();
        if(id !== null) {
          this.existeProyecto = true;
          session.proId = this.proId;
            this._formularioService
              .cargarComponentesByProyecto(id)
              .subscribe((res: any) => {
                if (res != null) {
                  debugger;
                  this.componentes = res;
                  this.proyecto.proFechaPuntualInicial = this.componentes.comFechaInicioFestival;
                  this.proyecto.proFechaPuntualFinal = this.componentes.comFechaFinalFestival;
                  alert(this.proyecto.proFechaPuntualInicial);
                }
              });
          //this._usuarioService.setCurrentSession(this.session);
          //this.getProyecto(this.proId);
      }
        // if (this.proyecto.proEstado === 'E') {
        //   Swal.fire(
        //     'Importante',
        //     'El proyecto se encuentra en estado envíado!',
        //     'info'
        //   );
        //   this.router.navigate(['/dashboard']);
        // }
        //alert("proyecto2" + this.proyecto.proIdProponente);
        if (this.proyecto.zonId !== null) {
          //this.itemsArea = new Array();
          // if (this.proyecto.areId !== null) {
          //   this.itemsArea.push(this.proyecto.areId);
          // }
          // if (this.proyecto.areaId1 !== null) {
          //   this.itemsArea.push(this.proyecto.areaId1);
          // }
          // if (this.proyecto.areaId2 !== null) {
          //   this.itemsArea.push(this.proyecto.areaId2);
          // }
          // if (this.proyecto.areaId3 !== null) {
          //   this.itemsArea.push(this.proyecto.areaId3);
          // }
          this.cargarMunicipios(this.proyecto.zonDepId);

          // if (this.proyecto.linId !== null) {
          //   this.cargarTemasbyLinea(this.proyecto.linId);
          //   this.cargarDescripcion(this.proyecto.linId);
          //   this.cargarValoresIndicador(this.proyecto.proId);
          //   this.cargarIndicadoresLinea(this.proyecto.linId);
           //this.cargarComponente(this.proyecto.proId);
          //   this.cargarCronogramabyProyecto(this.proyecto.proId);
          //   this.cargarActividadesObligatoriasbyProyecto(this.proyecto.proId);
          //   //this.cargarPresupuestoDetalleTipo();
          //   this.cargarPresupuestoDetalle(this.proyecto.proId);
          //   this.cargarBeneficiados(this.proyecto.proId);
          // }
          
        }
        // Cargando fechas del proyecto

         
        if (
          this.proyecto.proFechaInicial !== null 
        ) {
          this.proyecto.proFechaInicial = 
            moment(this.proyecto.proFechaInicial).format("YYYY-MM-DD")
          
        }
        if (
          this.proyecto.proFechaFinal !== null 
        ) {
          this.proyecto.proFechaFinal = 
            moment(this.proyecto.proFechaFinal).format("YYYY-MM-DD")
          
        }
        if (
          this.proyecto.proFechaLegalizacion !== null 
        ) {
          this.proyecto.proFechaLegalizacion = 
            moment(this.proyecto.proFechaLegalizacion).format("YYYY-MM-DD")
          
        }
        if (
          this.proyecto.proFechaPuntualFinal !== null 
        ) {
          alert("fecha");
          this.proyecto.proFechaPuntualFinal = 
            moment(this.proyecto.proFechaPuntualFinal).format("YYYY-MM-DD")
          
        }
        if (
          this.proyecto.proFechaPuntualInicial !== null 
        ) {
          this.proyecto.proFechaPuntualInicial = moment(this.proyecto.proFechaPuntualInicial).format("YYYY-MM-DD")
            //moment(this.proyecto.proFechaPuntualInicial).format("YYYY-MM-DD 00:00:00")
       
        }
        

        

      } );
    }
  
        
       
    
  /**
   * Método usado para cargar indicadores
   * @memberof FormularioBComponent
   */


 

  

  /**
   * Método usado para cargar las líneas
   * @memberof FormularioBComponent
   */
  cargarLineas() {
    this._administracionService.cargarTipoLinea().subscribe((res: Lineas[]) => {
      this.listaLineas = res;
    });
  }

  /**
   * Método usado para cargar áreas temáticas
   * @memberof FormularioBComponent
   */
  cargarAreas() {
    this._administracionService.cargarAreas().subscribe((res) => {
      this.listaAreas = res;
      this.dataArea = new ArrayStore({
        data: this.listaAreas,
        key: "areId",
      });
    });
  }





  /**
   * Método usado para cargar departamentos
   * @memberof FormularioBComponent
   */
  cargarDepartamentos() {
    this._administracionService.cargarDepartamentos().subscribe((res) => {
      this.listaDepartamentos = res;
    });
  }

  /**
   * Método usado para cargar municipios
   * @param {*} departamentoId
   * @memberof FormularioBComponent
   */
  cargarMunicipios(departamentoId: any) {
    this._administracionService
      .cargarMunicipios(departamentoId)
      .subscribe((res) => {
        this.listaMunicipios = res;
        //this.cargarValoresIndicadoresLineaCategoriaMunicipio(this.proyecto.proId);
      });
  }



  /**
   * Evento de selección del departamento
   * @memberof FormularioBComponent
   */
  changeDepartamento() {
    this.cargarMunicipios(this.proyecto.zonDepId);
  }

 

  changeMunicipio(e: any) {
    //let zonId = e.split(' ')[1];
    //this.showIndicadoresLineaCategoriaMunicipio(zonId);
    this.cargarValoresIndicadoresLineaCategoriaMunicipio(this.proId);
  }


  /**
   * Evento guardar proyecto
   * @param {*} isValid
   * @param {string} paso
   * @memberof FormularioBComponent
   */
  actualizarProyecto(isValid: boolean) {
    // Agregamos los temas seleccionados
    //this.proyecto.proId = 0;
    if (isValid) {
      this.proyecto.proFechaInicial = moment(this.proyecto.proFechaInicial).format("YYYY-MM-DD 00:00:00");
      this.proyecto.proFechaFinal = moment(this.proyecto.proFechaFinal).format("YYYY-MM-DD 23:59:59");
      this.proyecto.proFechaLegalizacion = moment(this.proyecto.proFechaLegalizacion).format("YYYY-MM-DD 23:59:59");
      this.proyecto.proFechaPuntualFinal = moment(this.proyecto.proFechaPuntualFinal).format("YYYY-MM-DD 23:59:59");
      this.proyecto.proFechaPuntualInicial = moment(this.proyecto.proFechaPuntualInicial).format("YYYY-MM-DD 23:59:59");
      this.proyecto.proIdProponente = this.proId;
     
      this.loadingVisible = true;
      this._formularioService.guardarProyecto(this.proyecto).subscribe(
        (result: any) => {
          this.loadingVisible = false;
          if (result.resultado) {
            Swal.fire("Información Proyecto", "La información del proyecto que almacenada!", "success");
            this.proyecto.proId = result.id;
            //this.estadoTemasbyProyecto = [];
           //this.listaValoresIndicadoresLineaCategoriaMunicipio = [];
            //this.checkedRB = false;
            //this.flagIncentivos = true;
            //this.flagShowIncentivos = false;
            this.getProyecto(this.proId);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error al intentar guardar la información!",
              text: result.mensaje,
            });
          }
        },
        (error) => {
          this.loadingVisible = false;
          if (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error al intentar guardar la información!",
            });
          }
        }
      );
    }
    else
      {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en la validación!",
        });
      }
  }

  //Trayectoria

  // cargarTrayectoria() {
  //   let obligatorias: number = 1;
  //   this._formularioService.GetTrayectoriaByTipo(obligatorias).subscribe((res) => {
  //     this.ListaTrayectoria = res;
  //     this._formularioService.GetConsultaTrayectoria(this.proId).subscribe((rest) => {
  //       if (rest != null) {
  //         for (let respuesta of rest) {
  //           var item = this.ListaTrayectoria.find(
  //             (x) => x.trA_ID == respuesta.trA_ID
  //           );
  //           if (item != null) {
  //             item.tpR_RESPUESTA_TRAYECTORIA = respuesta.tpR_RESPUESTA_TRAYECTORIA;
  //             this.esVisibleTrayectoria = false;
  //           }
  //           else {
  //             this.idTrayectoria = respuesta.ttR_ID;
  //           }
  //         }
  //         this.trayectoriaProyecto.ttR_ID = this.idTrayectoria;
  //         this.showPreguntas(this.idTrayectoria);
  //       }
  //     });
  //   });
  // }

  // cargarTipoTrayectoria() {
  //   this._formularioService.GetTipoTrayectoria().subscribe((res) => {
  //     this.ListaTipoTrayectoria = res;
  //   });
  // }

  // crearTrayectoriaProyecto(isValid: boolean) {
  //   if (isValid) {
  //     this.loadingVisible = true;
  //     this._formularioService.addTrayectoriasProyectos(this.respuestasTrayectoria)
  //       .subscribe(
  //         (result: any) => {
  //           this.loadingVisible = false;
  //           if (result.resultado) {
  //             this.esVisibleTrayectoria = false;
  //             Swal.fire('Trayectoria', 'Quedo almacenada la trayectoria del proyecto!', 'success');
  //           }
  //           else {
  //             Swal.fire({
  //               icon: 'error',
  //               title: 'Oops...',
  //               text: result.mensaje,
  //             })
  //           }
  //         },
  //         (error) => {
  //           this.loadingVisible = false;
  //           if (error) {
  //             Swal.fire({
  //               icon: 'error',
  //               title: 'Oops...',
  //               text: 'Error al intentar guardar la información!',
  //             })
  //           }
  //         }
  //       );
  //   }
  //   else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Trazabilidad de proyectos',
  //       text: 'Existen campos vacios sin diligenciar!',
  //     })
  //   }
  // }

  // cargarTrayectoriaTipoTrayectoria(tipoTrayectoria: number) {
  //   this._formularioService.GetTrayectoriaByTipo(tipoTrayectoria).subscribe((res) => {
  //     this.ListaTrayectoriaTipoTrayectoria = res;
  //     this._formularioService.GetConsultaTrayectoria(this.proId).subscribe((rest) => {
  //       if (rest != null) {
  //         for (let respuesta of rest) {
  //           var itemRes = this.ListaTrayectoriaTipoTrayectoria.find(
  //             (x) => x.trA_ID == respuesta.trA_ID
  //           );
  //           if (itemRes != null) {
  //             itemRes.tpR_RESPUESTA_TRAYECTORIA = respuesta.tpR_RESPUESTA_TRAYECTORIA;
  //           }
  //         }
  //       }
  //     });
  //   });
  // }

  // showPreguntas(tipoTrazabilidad: number) {
  //   this.cargarTrayectoriaTipoTrayectoria(tipoTrazabilidad);
  // }

  // form_fieldDataChanged(e: any) {
  //   let updatedField = e.dataField;
  //   let newValue = e.value;
  //   if (updatedField == 'ttR_ID') {
  //     if (newValue != null) {
  //       this.showPreguntas(newValue);
  //     }
  //   }
  // }

  // GuardarTrayectoriaDinamicas(e: any, tipoValidacion: number) {
  //   if (tipoValidacion == 1) {
  //     this.isValid = validationEngine.validateGroup('vg1').isValid;
  //     var idCombo = this.trayectoriaProyecto.ttR_ID;

  //     if (!this.isValid) {
  //       notify(
  //         {
  //           message: 'Debe contestar todas las preguntas!',
  //           position: {
  //             my: 'center top',
  //             at: 'center top',
  //           },
  //         },
  //         'error',
  //         3000
  //       );
  //       return;
  //     }
  //   }
  //   if (tipoValidacion == 2) {
  //     this.isValid = validationEngine.validateGroup('vg2').isValid;
  //     var idCombo = this.trayectoriaProyecto.ttR_ID;

  //     if (!this.isValid) {
  //       notify(
  //         {
  //           message: 'Debe contestar todas las preguntas!',
  //           position: {
  //             my: 'center top',
  //             at: 'center top',
  //           },
  //         },
  //         'error',
  //         3000
  //       );
  //       return;
  //     }
  //     if (idCombo == 0) {
  //       notify(
  //         {
  //           message: 'Ingrese el el numeral 2.4 o el numeral 2.5.',
  //           position: {
  //             my: 'center top',
  //             at: 'center top',
  //           },
  //         },
  //         'error',
  //         3000
  //       );
  //       return;
  //     }
  //   }

  //   this.respuestasTrayectoria = [];
  //   var item = this.ListaTrayectoria;
  //   var itemRes = this.ListaTrayectoriaTipoTrayectoria;

  //   for (let i = 0; i < item.length; i++) {
  //     let np = {} as TrayectoriaProyecto;
  //     np.tpR_RESPUESTA_TRAYECTORIA = item[i].tpR_RESPUESTA_TRAYECTORIA;
  //     np.trA_ID = item[i].trA_ID;
  //     np.prO_ID = this.proId;
  //     np.ttR_ID = this.trayectoriaProyecto.ttR_ID;
  //     this.respuestasTrayectoria.push(np);
  //   }

  //   for (let i = 0; i < itemRes.length; i++) {
  //     let np = {} as TrayectoriaProyecto;
  //     np.tpR_RESPUESTA_TRAYECTORIA = itemRes[i].tpR_RESPUESTA_TRAYECTORIA;
  //     np.trA_ID = itemRes[i].trA_ID;
  //     np.prO_ID = this.proId;
  //     np.ttR_ID = this.trayectoriaProyecto.ttR_ID;
  //     this.respuestasTrayectoria.push(np);
  //   }

  //   this.crearTrayectoriaProyecto(true);
  // }

  //presupuesto

  // cargarPresupuestoDetalleTipo() {
  //   this._formularioService.GetPresupuestoDetalleTipo().subscribe((res) => {
  //     this.appPresupuestoDetalleTipo = res;
  //   })
  // }

  // cargarPresupuestoDetalle(id: number) {
  //   this._formularioService.GetPresupuestoDetalle(id).subscribe((res) => {
  //     this.appPresupuestoDetalle = res;
  //     for (var i = 0; i < this.appPresupuestoDetalle.length; i++) {
  //       this.appPresupuestoDetalle[i].proId = this.proId;
  //       this.recursosPropios = this.appPresupuestoDetalle[i].tiP_RECURSOS_ENTIDAD;
  //     }
  //   })
  // }

  // valueChanged(data: any, name: number, idGrupo: number) {
  //   var r = data.element.name;
  //   this.sumaTotal = 0;

  //   for (var i = 0; i < this.appPresupuestoDetalle.length; i++) {
  //     if (this.appPresupuestoDetalle[i].aptId == parseInt(data.element.id)) {
  //       if (name == 1) {
  //         this.appPresupuestoDetalle[i].pdeRecursosMinisterio = data.value;
  //         this.appPresupuestoDetalle[i].pdeValorTotal = (parseInt(this.appPresupuestoDetalle[i].pdeRecursosMinisterio) + parseInt(this.appPresupuestoDetalle[i].pdeIngresosPropios)).toString();
  //       }

  //       if (name == 2) {
  //         this.appPresupuestoDetalle[i].pdeIngresosPropios = data.value;
  //         this.appPresupuestoDetalle[i].pdeValorTotal = (parseInt(this.appPresupuestoDetalle[i].pdeRecursosMinisterio) + parseInt(this.appPresupuestoDetalle[i].pdeIngresosPropios)).toString();
  //       }
  //       if (name == 3) {
  //         this.appPresupuestoDetalle[i].pdeOtrosRecursos = data.value;
  //         this.appPresupuestoDetalle[i].pdeValorTotal = this.appPresupuestoDetalle[i].pdeOtrosRecursos;
  //       }
  //       if (name == 4) {
  //         this.appPresupuestoDetalle[i].pdeDetalleOtrosRecursos = data.value;
  //       }
  //     }
  //   }

  //   var suma1 = "0";
  //   var suma2 = "0;"
  //   var sumaTotal = "0";
  //   var sumaGranTotal1 = "0";
  //   var sumaGranTotal2 = "0";
  //   var sumaGranTotalEgresos = "0";
  //   var SUBTOTALOTROSEGRESOS = "0";
  //   var SUBTOTALOTROSINGRESOS = "0";

  //   //sumatoria por grupo, recibo el id del grupo y excluyo el campo donde sumo
  //   for (var i = 0; i < this.appPresupuestoDetalle.length; i++) {
  //     if (this.appPresupuestoDetalle[i].atT_ID == idGrupo) {
  //       if (this.appPresupuestoDetalle[i].tcP_ID == 0 || this.appPresupuestoDetalle[i].tcP_ID == 2) {
  //         suma1 = (parseInt(suma1) + parseInt(this.appPresupuestoDetalle[i].pdeRecursosMinisterio)).toString();
  //         suma2 = (parseInt(suma2) + parseInt(this.appPresupuestoDetalle[i].pdeIngresosPropios)).toString();
  //         sumaTotal = (parseInt(sumaTotal) + parseInt(this.appPresupuestoDetalle[i].pdeValorTotal)).toString();
  //       }
  //     }
  //   }

  //   //actualizo la suma de los grupos y lo coloco en el campo suma
  //   for (var i = 0; i < this.appPresupuestoDetalle.length; i++) {
  //     if (this.appPresupuestoDetalle[i].atT_ID == idGrupo && this.appPresupuestoDetalle[i].tcP_ID == 1) {
  //       this.appPresupuestoDetalle[i].pdeRecursosMinisterio = suma1;
  //       this.appPresupuestoDetalle[i].pdeIngresosPropios = suma2;
  //       this.appPresupuestoDetalle[i].pdeValorTotal = sumaTotal;
  //     }
  //     if (this.appPresupuestoDetalle[i].tcP_ID == 7) {
  //       SUBTOTALOTROSEGRESOS = this.appPresupuestoDetalle[i].pdeValorTotal;
  //     }
  //     if (this.appPresupuestoDetalle[i].tcP_ID == 8) {
  //       SUBTOTALOTROSINGRESOS = this.appPresupuestoDetalle[i].pdeValorTotal;
  //     }
  //   }

  //   //hago sumatorias de todos los campos que son subtotales, para actualizar el gran total
  //   for (var i = 0; i < this.appPresupuestoDetalle.length; i++) {
  //     if (this.appPresupuestoDetalle[i].tcP_ID == 1) {
  //       sumaGranTotal1 = (parseInt(sumaGranTotal1) + parseInt(this.appPresupuestoDetalle[i].pdeRecursosMinisterio)).toString();
  //       sumaGranTotal2 = (parseInt(sumaGranTotal2) + parseInt(this.appPresupuestoDetalle[i].pdeIngresosPropios)).toString();
  //       sumaGranTotalEgresos = (parseInt(sumaGranTotalEgresos) + parseInt(this.appPresupuestoDetalle[i].pdeValorTotal)).toString();
  //     }
  //   }

  //   //Actualizo los valores de los gran totales de acuerdo a la parametrizacion de la base de datos.
  //   for (var i = 0; i < this.appPresupuestoDetalle.length; i++) {
  //     //SUB TOTAL EGRESOS
  //     if (this.appPresupuestoDetalle[i].tcP_ID == 3) {
  //       this.appPresupuestoDetalle[i].pdeValorTotal = sumaGranTotalEgresos;
  //     }
  //     //SUB TOTAL INGRESOS
  //     if (this.appPresupuestoDetalle[i].tcP_ID == 4) {
  //       this.appPresupuestoDetalle[i].pdeValorTotal = "0";
  //       this.appPresupuestoDetalle[i].pdeRecursosMinisterio = sumaGranTotal1;
  //       this.appPresupuestoDetalle[i].pdeIngresosPropios = sumaGranTotal2;
  //       var calculoRecursoMinisterios = parseInt(sumaGranTotal1) * 0.1;
  //       if (parseInt(sumaGranTotal1) > parseInt(this.appPresupuestoDetalle[i].valoR_TOPE_PRESUPUESTO)) {
  //         this.errorValidacionTope = "El tope máximo para solicitar al ministerio de esta linea temática es $" + this.appPresupuestoDetalle[i].valoR_TOPE_PRESUPUESTO;
  //         this.seHabilitaGuardarPresupuesto = true;
  //       }
  //       else {
  //         this.errorValidacionTope = "";
  //         this.seHabilitaGuardarPresupuesto = false;
  //       }
  //       //se hace la validacion si el tipo de entidad lo pide
  //       if (this.recursosPropios == true) {
  //         if (parseInt(sumaGranTotal2) < calculoRecursoMinisterios) {
  //           this.errorValidacion = "Debe ser el mínimo el 10% del valor solicitado al Ministerio de Cultura";
  //           this.seHabilitaGuardarPresupuesto = true;
  //         }
  //         else {
  //           this.errorValidacion = "";
  //           this.seHabilitaGuardarPresupuesto = false;
  //         }
  //       }
  //     }

  //     //B. TOTAL INGRESOS - Sumatoria columnas (2) y (3)
  //     if (this.appPresupuestoDetalle[i].tcP_ID == 5) {
  //       this.appPresupuestoDetalle[i].pdeValorTotal = sumaGranTotalEgresos;
  //     }
  //     //TOTAL SOLICITADO AL MINISTERIO DE CULTURA (sumatoria de la columna 2)
  //     if (this.appPresupuestoDetalle[i].tcP_ID == 6) {
  //       this.appPresupuestoDetalle[i].pdeValorTotal = sumaGranTotal1;
  //     }
  //     //C. SUBTOTAL OTROS EGRESOS y E. GRAN TOTAL DE EGRESOS
  //     if (this.appPresupuestoDetalle[i].tcP_ID == 9) {
  //       this.appPresupuestoDetalle[i].pdeValorTotal = (parseInt(SUBTOTALOTROSEGRESOS) + parseInt(sumaGranTotalEgresos)).toString();
  //     }
  //     //C. SUBTOTAL OTROS EGRESOS y E. GRAN TOTAL DE INGRESOS
  //     if (this.appPresupuestoDetalle[i].tcP_ID == 10) {
  //       this.appPresupuestoDetalle[i].pdeValorTotal = (parseInt(SUBTOTALOTROSINGRESOS) + parseInt(sumaGranTotalEgresos)).toString();
  //     }
  //   }

  // }

  // GuardarPresupuesto(e: any) {
  //   this.loadingVisible = true;
  //   this._formularioService.addPresupuestoProyectos(this.appPresupuestoDetalle)
  //     .subscribe(
  //       (result: any) => {
  //         this.loadingVisible = false;
  //         if (result.resultado) {
  //           Swal.fire('Presupuesto', 'Quedo almacenado el presupuesto del proyecto!', 'success');
  //         }
  //         else {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Oops...',
  //             text: result.mensaje,
  //           })
  //         }
  //       },
  //       (error) => {
  //         this.loadingVisible = false;
  //         if (error) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Oops...',
  //             text: 'Error al intentar guardar la información!',
  //           })
  //         }
  //       }
  //     );
  // }

  // color(idTcp: number, idattId: number) {
  //   let color: string;
  //   if (idTcp == 1) {
  //     color = '#b3e6ff';
  //   }
  //   if (idattId == 8 || idattId == 10) {
  //     color = '#00cc00';
  //   }
  //   return color;
  // }

  // ocultar(idTcp: number) {
  //   let ocultValidacion: string;
  //   if (idTcp == 4) {
  //     ocultValidacion = "inline"
  //   }
  //   else {
  //     ocultValidacion = "none";
  //   }
  //   return ocultValidacion;
  // }

  // colorTotal(idTcp: number, idattId: number) {
  //   let color: string;
  //   if (idTcp == 1) {
  //     color = '#b3e6ff';
  //   }
  //   else {
  //     color = '#e6f7ff';
  //   }
  //   if (idattId == 8 || idattId == 10) {
  //     color = '#00cc00';
  //   }
  //   return color;
  // }

  // negrilla(idTcp: number) {
  //   let negrilla: string;
  //   if (idTcp == 1) {
  //     negrilla = 'bold';
  //   }
  //   return negrilla;
  // }

  // cargarBeneficiados(proId: any) {
  //   this._formularioService.GetAppBeneficiados(proId).subscribe((res: any) => {
  //   this.appBeneficiarios = res;
  //   });
  // }

  // actualizarBeneficiado(isValid: any ) {
  //   this.appBeneficiarios.beeTotalBeneficiados = this.appBeneficiarios.benPersonasAsistentes + this.appBeneficiarios.benNumeroArtistasNacionales + this.appBeneficiarios.benPersonasLogistica
  //   this.appBeneficiarios.proId = this.proId;
  //   if (this.appBeneficiarios.beeTotalBeneficiados == 0) {
  //     notify(
  //       {
  //         message: 'La sumatoria no debe ser igual a cero',
  //         position: {
  //           my: 'center top',
  //           at: 'center top',
  //         },
  //       },
  //       'error',
  //       3000
  //     );
  //     return;
  //   }
  //   this._formularioService.ActualizarBeneficiado(this.appBeneficiarios).subscribe(
  //     (result: any) => {
  //       if (result.resultado) {
  //         Swal.fire(
  //           "Crear Formulario B",
  //           "La informacion de beneficiados se guardo correctamente!",
  //           "success"
  //         );
  //         this.cargarBeneficiados(this.proId);
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: result.mensaje,
  //         });
  //       }
  //     },
  //     (error) => {      
  //       if (error) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: "Error al intentar guardar la información!",
  //         });
  //       }
  //     }
  //   );
  // }

}