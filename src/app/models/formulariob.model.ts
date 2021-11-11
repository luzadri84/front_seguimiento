// #region Interfaces
export interface pasoBase {
    index: number;
    NombreTituloPaso: string;
}
// #endregion


export class FormularioB {
    constructor(
        public proyecto: Proyecto,
        public temasbyProyectos: TemasbyProyectos[],
        public componentes: Componentes,
        public cronograma: Cronograma[],
        public proyectoActividadesObligatorias: ProyectoActividadesObligatorias[],
        public valoresIndicador: ValoresIndicador[],
        public valoresIndicadorLineaCategoriaMunicipio: ValoresIndicadorLineaCategioriaMunicipio[] 
    ) { }
}

export class Componentes{
    constructor(
        public proId: number,
        public comJustificacion: string,
        public comObjetivoGeneral: string,
        public comDescripcion: string,
        public comMetas: string,
        public comMetasB: string,
        public comMetasC: string,
        public comMetasD: string,
        public comMetasE: string,
        public comMetasF: string,
        public usuCreo: string,
        public usuModifico: string,
        public fecCreo: string,
        public fecModifico: string,
        public comFechaInicioFestival:string,
        public comFechaFinalFestival:string,
    ){}
}

export class Cronograma{
    constructor(
        public cprId: number,
        public cprFechaInicio: string,
        public cprFechaFinal: string,
        public proId: number,
        public cprActividad: string,
        public cprMeta: string,
        public usuCreo: string,
        public usuModifico: string,
        public fecCreo: string,
        public fecModifico: string
    ){}
}

export class ProyectoActividadesObligatorias{
    constructor(
        public paoId: number,
        public proId: number,
        public actId: number,
        public actFechaInicio: string,
        public actFechaFinal:string,
        public usuCreo: string,
        public usuModifico: string,
        public fecCreo: string,
        public fecModifico: string
    ){}
}

export class ActividadesObligatorias{
    constructor(
        public actId: number,
        public actActividad: string,
        public actFechaInicio: string,
        public actFechaFinal: string
    ){}
}

export class Temas {
    constructor(
        public temId: number,
        public linId: number,
        public Descripcion: string,
        public Checked: boolean
    ) { }
}

export class TemasbyProyectos {
    constructor(
        //public Id: number,
        public temId: number,
        public proId: number
    ) { }
}

export class Proyecto {
    constructor(
        public proId: number,
        public proTipoCuenta: string,
        public proNumeroCuenta: string,
        public proNombre: string,
        public entId: number,
        public proIdProponente: number,
        public proPersonaEncargadaProyecto: string,
        public proTelefonosPersonaEncargadaProyecto: string,
        public proCorreoPersonaEncargada: string,
        public zonIdEntidadBancaria: string,
        public zonIdEntidadBancariaDep: string,
        public linId: number,
        public zonDepId: string,
        public zonId: string,
        public areId: number,
        public proOtrosMunicipios: string,
        public proCorregimiento: string,
        public areaId1: number,
        public areaId2: number,
        public areaId3: number,
        public proJustificacion: string,
        public proODescripcion: string,
        public proObjeto: string,
        public proFechaInicial: string,
        public proFechaFinal: string,
        public proEstado: string,
        public usuCreo: string,
        public usuModifico: string,
        public fecCreo: string,
        public fecModifico: string,
        public ProConvenio: string,
        public ProNumeroRadicacion: string,
        public VigId: number,
        public ProFechaLegalizacion: string,
        public ProCelularPersonaEncargada: string,
        public ProFechaPuntualInicial: string,
        public ProFechaPuntualFinal: string,

        //public proEstado: string,
    ) { }
}


export class ProyectoSeguimiento {
    
         proId: number;
       
         proNombre: string;
     
         proIdProponente: number;
         proPersonaEncargadaProyecto: string;
         proTelefonosPersonaEncargadaProyecto: string;
         proCorreoPersonaEncargada: string;
  
         linId: number;
         zonDepId: string;
         zonId: string;
         areId: number;
    
         proFechaInicial: string;
         proFechaFinal: string;
         
         proConvenio: string;
         proNumeroRadicacion: string;
         vigId: number;
         proFechaLegalizacion: string;
         proCelularPersonaEncargada: string;
         proFechaPuntualInicial: string;
         proFechaPuntualFinal: string;

         proUsuarioAsignado: number;
         zonaId: number;
         proFechaEntregadoSupervisor: string;
         proFechaProrroga: string;
         proEstadoSeguimiento: number;
         proFechaEstado: string;
         proFechaRadicacionSeguimiento: string;
         proCuentasPagar: number;
         proEstadoObservaciones: string;
        
    
}


export class ProyectoActualizacion {
    
    proId: number;
    proUsuarioAsignado: number;
    zonaId: number;
    proFechaEntregadoSupervisor: string;
    proFechaProrroga: string;
    proEstadoSeguimiento: number;
    proFechaEstado: string;
    proFechaRadicacionSeguimiento: string;
    proCuentasPagar: number;
    proEstadoObservaciones: string;
   //public proEstado: string,

}

export class Lineas {
    constructor(
        public linId: number,
        public linNombre: string,
        public linDescripcion: string,
        public linDuracionMinima: number
    ) { }
}

export class Indicadores{
    constructor(
        public indId: number,
        public indNombre: string,
        public indTipo: number
    ){}
}

export class IndicadoresbyLinea{
    constructor(
        public ilId: number,
        public indId: number,
        public linId: number,
        public indNombre: string,
        public indOrder: number,
        public indTipo: number, 
        public valValor: number,
        public valValorTexto: string
    ){}
}


export class HistoricoSeguimiento{
    constructor(
        public  ID: number,
        public  ProId: number,
        public  ProUsuarioAsignado: number, 
        public  ZonaId: number, 
        public  ProFechaEntregadoSupervisor: string, 
        public  ProEstadoSeguimiento: number, 
        public  ProFechaProrroga: string, 
        public  ProFechaEstado: string, 
        public  ProFechaRadicacionSeguimiento: string, 
        public  ProCuentasPagar: number, 
        public  ProEstadoObservaciones: string, 
        public  FecModifico: string, 
        public  UsuModifico: string
    ){}
}

export class ValoresIndicador{
    constructor(
        public viId: number,
        public ilId: number,
        public proId: number,
        public valValor: number,
        public valValorTexto: string,
        public usuCreo: string,
        public usuModifico: string,
        public fecCreo: string,
        public fecModifico: string,
    ){}
}


export class IndicadorLineaCategoriaMunicipio{
    constructor(
        public ilcmId: number,
        public indId: number,
        public linId: number,
        public idZonCategoria: number,
        public indNombre: string,
        public indTipo: number,
        public ilmOrder: number,
        public valValor: number,
        public valValorTexto: string,
        public usuCreo: string,
        public usuModifico: string,
        public fecCreo: string,
        public fecModifico: string,

    ){}
}

export class ValoresIndicadorLineaCategioriaMunicipio{
    constructor(
        public vilcmId: number,
        public ilcmId: number,
        public proId: number,
        public valValor: number,
        public valValorTexto: string,
        public usuCreo: string,
        public usuModifico: string,
        public fecCreo: string,
        public fecModifico: string,

    ){}
}

export class Areas {
    constructor(
        public AreId: number,
        public AreNombre: string
    ) { }
}

export class Departamentos {
    constructor(
        public ZonId: string,
        public ZonNombre: string,
        public ZonPadreId: string,
        public ZonPoblacion: number,
        public ZonPoblacionsinic: number,
        public ZonDistrito: number,
        public ZonLatitud: number,
        public ZonLongitud: number,
        public ZonCategoria: string
    ) { }
}

export class Municipios {
    constructor(
        public ZonId: string,
        public ZonNombre: string,
        public ZonPadreId: string,
        public ZonPoblacion: number,
        public ZonPoblacionsinic: number,
        public ZonDistrito: number,
        public ZonLatitud: number,
        public ZonLongitud: number,
        public ZonCategoria: string
    ) { }
}

export class Metas{
    constructor(
        public metaId: number,
        public metaNombre: string
    ){}
}


export class Funcionario
{
    constructor(
        public id: number,
        public nombrecompleto:string
    ){}
}


export class Zonas
{
    constructor(
        public zonId: number,
        public zonaNombre:string
    ){}
}

export class Estados
{
    constructor(
        public proEstado: number,
        public proNombreEstado:string
    ){}
}

export class editorOptions{
    constructor(
        public min: Date,
        public max: Date
    ){}
}

export class validatorRules{
    constructor(
        public type: string
    ){}
}

//#region Secciones del formulario
export class FormInfoProyecto implements pasoBase {
    constructor(
        public index: number,
        public NombreTituloPaso: string,
    ) { }
}

export class FormTrayectoria implements pasoBase {
    constructor(
        public index: number,
        public NombreTituloPaso: string,

    ) { }
}

export class FormCompProyecto implements pasoBase {
    constructor(
        public index: number,
        public NombreTituloPaso: string,

    ) { }
}


export class FormPresupuesto implements pasoBase {
    constructor(
        public index: number,
        public NombreTituloPaso: string,

    ) { }
}



//#endregion


//#region Secciones de la trayectoria y presupuesto

export interface ITrayectoriaProyecto{
    
    tpR_ID: number,
    tpR_RESPUESTA_TRAYECTORIA:string,
    trA_ID:number,
    prO_ID:number,
    ttR_ID:number

}

// export class TrayectoriaProyecto implements ITrayectoriaProyecto{
// constructor(
//    public tpR_ID: number,
//    public tpR_RESPUESTA_TRAYECTORIA:string,
//    public trA_ID:number,
//    public prO_ID:number,
//    public ttR_ID:number
// ){}
// }

export class TrayectoriaProyecto{
    
    tpR_ID: number;
    tpR_RESPUESTA_TRAYECTORIA:string;
    trA_ID:number;
    prO_ID:number;
    ttR_ID:number;

}

export class AppPresupuestoDetalleTipo{
aptId:number
aptDescripcion: string;
aptOrden: string;
atT_ID:string;
}


export class AppPresupuestoDetalle{
pdeId: string;
pdeValorTotal: string;
pdeRecursosMunicipio: string;
pdeRecursosDepartmento: string;
pdeRecursosMinisterio: string;
pdeIngresosPropios: string;
pdeOtrosRecursos: string;
proId: number;
aptId: number;
usuCreo: string;
usuModifico: string;
fecCreo:string;
fecModifico:string;
apT_DESCRIPCION: string;
tcP_ID:number;
atT_DESCRIPCION: string;
atT_ID: number;
pdeDetalleOtrosRecursos:string;
valoR_TOPE_PRESUPUESTO:string;
tiP_RECURSOS_ENTIDAD:boolean;
//suma: string;
}
//#endregion


//#region Documentos
export class AppDocumentosTipoEntidades
{
tdoId: number;
tdoNs: string;
tdoOrden: number;
tdoNombre: string;
tdoObservaciones: string;
numeroActualPaginas:number =0;
}        
////#endregion

export class AppBeneficiarios{
    
    benPersonasAsistentes: number;
    benNumeroArtistasNacionales:number;
    beeTotalBeneficiados:number;
    benNumeroArtistasInternacionales:number;
    proId:number;

    benPersonasLogistica: number;
    benOtrasPersonasBeneficiadasDescripcion:string;
    benCaracteristicasPoblacion:string;

}


export class Resultado
{
    prO_ID: number;
    id_PROPONENTE: number;
    prO_NUMERO_RADICACION: string;
    prO_NOMBRE: string;
    prO_RAZON_SOCIAL: string;
    prO_FECHA_INICIAL: string;
    prO_FECHA_FINAL:string;

    prO_ESTADO: string;
    prO_OBSERVACIONES: string;
    liN_NOMBRE: string;
    ubicacion: string;
    area:string;
}  


export class Busqueda
{
    VigId: number;
    DepId: string;
    MunId: string;
    Proyecto:string ;
    Proponente:string;
    nroRadicacion:string;
}

export class Vigencia
{
    vigId: number;
    vigNombre:string;
}

