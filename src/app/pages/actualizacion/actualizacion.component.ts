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
  TrayectoriaProyecto, AppPresupuestoDetalleTipo, AppPresupuestoDetalle, Indicadores, IndicadoresbyLinea, ValoresIndicador, ValoresIndicadorLineaCategioriaMunicipio, AppBeneficiarios, Vigencia, ProyectoSeguimiento, pasoBase, Funcionario, Zonas, Estados, HistoricoSeguimiento
} from '../../models/formulariob.model';
import { AdministracionService } from '../../services/administracion/administracion.service';
import { FormularioService } from '../../services/formulario/formulario.service';
//import { BaseOptions } from 'vm';


@Component({
  selector: 'app-actualizacion',
  templateUrl: './actualizacion.component.html',
  styleUrls: ['./actualizacion.component.css']
})
export class ActualizacionComponent implements OnInit {
  [x: string]: any;
  proId: any;
  public loadingVisible = false;
  vigencia: Vigencia[] = [];
  listaLineas: Lineas[] = [];
  supervisor: Funcionario[] = [];
  zonas: Zonas[] = [];
  estados: Estados[] = [];
  listaAreas: Areas[] = [];
  listaTemas: Temas[] = [];
  //listaCronograma: Cronograma[] = [];
  listaDepartamentos: Departamentos[] = [];
  listaMunicipios: Municipios[] = [];
  itemsArea = [];
  linea: Lineas;
  dataArea: ArrayStore;
  lineaDescripcion: string;
  proyecto: ProyectoSeguimiento = new ProyectoSeguimiento();
  fechaInicioProyecto: Date;
  year: number;
  ListaTrayectoria = [];
  listaDetalleTipo = [];
  ListaTipoTrayectoria = [];
  ListaTrayectoriaTipoTrayectoria = [];
  listaILMC = [];
  listaVILMC = [];
  //historicoSeguimiento: HistoricoSeguimiento[];
  arreglo = [];
  selectTextOnEditStart: boolean = true;
  startEditAction: string = "click";
  errorValidacion: string = "";
  errorValidacionTope: string = "";
  permiteedicion: boolean  = false;
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
  
    
    this.cargarDepartamentos();
    this.cargarLineas();
    this.cargarAreas();
    this.cargarSupervisor();
    this.cargarZonas();
    this.cargarEstados();

    this._formularioService.GetVigencia().subscribe((res) => {
      this.vigencia = res;
    })

    

    // Se obtiene el proId de la ruta
    this.route.queryParamMap.subscribe((params) => {
      this.proId = params.get("proId");

     this.cargarHistorico(this.proId);
      //alert("parametro " + this.proId);
      
    });

    let session: Session = this._usuarioService.getCurrentSession();
    if (this.proId !== null) {
      this.getProyecto(this.proId);
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
   
  }



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



  getProyecto(id: number) {

    //alert("proyecto" + id);
    this._formularioService
      .cargarProponenbyProyecto(id)
      .subscribe((res: ProyectoSeguimiento) => {
        this.proyecto = res;

        let session : Session = this._usuarioService.getCurrentSession();
        this.permiteedicion = session.user.perfilesCuentausuario[0].perfil.permiteeditar; 
        if(id !== null) {
          this.existeProyecto = true;
          session.proId = this.proId;
        
      }
      
        if (this.proyecto.zonId !== null) {
        
          this.cargarMunicipios(this.proyecto.zonDepId);

         
          
        }

         
        if (
          this.proyecto.proFechaEntregadoSupervisor !== null 
        ) {
          this.proyecto.proFechaEntregadoSupervisor = 
            moment(this.proyecto.proFechaEntregadoSupervisor).format("YYYY-MM-DD")
          
        }
        if (
          this.proyecto.proFechaProrroga !== null 
        ) {
          this.proyecto.proFechaProrroga = 
            moment(this.proyecto.proFechaProrroga).format("YYYY-MM-DD")
          
        }
        if (
          this.proyecto.proFechaEstado !== null 
        ) {
          this.proyecto.proFechaEstado = 
            moment(this.proyecto.proFechaEstado).format("YYYY-MM-DD")
          
        }
        if (
          this.proyecto.proFechaRadicacionSeguimiento !== null 
        ) {
          this.proyecto.proFechaRadicacionSeguimiento = 
            moment(this.proyecto.proFechaRadicacionSeguimiento).format("YYYY-MM-DD")
          
        }

      } );
    }
  
    

  
  
  /**
   * Método usado para cargar las líneas
   * @memberof FormularioBComponent
   */
  cargarLineas() {
    this._administracionService.cargarTipoLinea().subscribe((res: Lineas[]) => {
      this.listaLineas = res;
    });
  }

  cargarHistorico(IdProd:number){
    this._formularioService.cargarHistoricoSeguimiento(IdProd).subscribe((res) => {
      this.historicoSeguimiento = res;
    });
  }

  cargarSupervisor() {
    this._administracionService.GetFuncionario(3).subscribe((res) => {
      this.supervisor = res;
    });
  }

  cargarZonas() {
    this._administracionService.GetZonas().subscribe((res) => {
      this.zonas = res;
    });
  }

  cargarEstados() {
    this._administracionService.GetEstados().subscribe((res) => {
      this.estados = res;
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
      this.proyecto.proFechaEntregadoSupervisor = moment(this.proyecto.proFechaEntregadoSupervisor).format("YYYY-MM-DD 00:00:00");
      this.proyecto.proFechaProrroga = moment(this.proyecto.proFechaProrroga).format("YYYY-MM-DD 23:59:59");
      this.proyecto.proFechaEstado = moment(this.proyecto.proFechaEstado).format("YYYY-MM-DD 23:59:59");
      this.proyecto.proFechaRadicacionSeguimiento = moment(this.proyecto.proFechaRadicacionSeguimiento).format("YYYY-MM-DD 23:59:59");
      this.proyecto.proIdProponente = this.proId;
     
      this.loadingVisible = true;
      this._formularioService.guardarProyecto(this.proyecto).subscribe(
        (result: any) => {
          this.loadingVisible = false;
          if (result.resultado) {
            Swal.fire("Información Proyecto", "La información del proyecto que almacenada!", "success");
            //this.proyecto.proId = result.id;
            //this.estadoTemasbyProyecto = [];
           //this.listaValoresIndicadoresLineaCategoriaMunicipio = [];
            //this.checkedRB = false;
            //this.flagIncentivos = true;
            //this.flagShowIncentivos = false;
            this.getProyecto(this.proId);
            this.cargarHistorico(this.proId);
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



}