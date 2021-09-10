import { Proyecto } from "./proyecto.model";
import { TiposEntidades } from "./tipos.entidad.model";

export class Proponente {
    constructor(
        public proId: number,
        public proRazonSocial: string,
        public proNit: string,
        public proPrimerNombreRepLegal: string,
        public proSegundoNombreRepLegal: string,
        public proPrimerApellidoRepLegal: string,
        public proSegundoApellidoRepLegal: string,
        public proDocumentoIdentidadRepresentanteLegal: string,
        public proLugarExpedicionDocumentoRepresentanteLegal: string,
        public proLugarExpDocRepLegDep: string,
        public proDireccionRepresentanteLegal: string,
        public proTelefonosRepresentanteLegal: string,
        public proTelefonoCelular: string,
        public proFaxRepresentanteLegal: string,
        public proCorreoElectronicoRepresentanteLegal: string,
        public proConfirmarCorreo: string,
        public proRegimenTributario: string,
        public proGranContribuyente: string,
        public proTarifa: number,
        public proResponsableIva: string,
        public proTarifaIca: string,
        public zonId: string,
        public zonDepId: string,
        public tipId: number,
        public zonIdExpedicionDocumento: string,
        public proBarrioComuna: string,
        public proTipoVinculacionPersona: string,
        public proDirtrad: string,
        public proLatitud: number,
        public proLongitud: number,
        public proEstadoGeo: string,
        public proActualizaPrimeraVez: number,
        public detPropId: number,
        public usuCreo: string,
        public usuModifico: string,
        public fecCreo: string,
        public fecModifico: string,
        public tip: TiposEntidades,
        public appProyectos: Proyecto[]
    ){}
}


export class Proponentes {
        
            proId: number;
            proRazonSocial: string;
            proNit: string;
            proPrimerNombreRepLegal: string;
            proSegundoNombreRepLegal: string;
             proPrimerApellidoRepLegal: string;
             proSegundoApellidoRepLegal: string;
             proDocumentoIdentidadRepresentanteLegal: string;
             proLugarExpedicionDocumentoRepresentanteLegal: string;
             proLugarExpDocRepLegDep: string;
             proDireccionRepresentanteLegal: string;
             proTelefonosRepresentanteLegal: string;
             proTelefonoCelular: string;
             proFaxRepresentanteLegal: string;
             proCorreoElectronicoRepresentanteLegal: string;
             proConfirmarCorreo: string;
             proRegimenTributario: string;
             proGranContribuyente: string;
            // public proTarifa: number,
            // public proResponsableIva: string,
            // public proTarifaIca: string,
            zonId: string;
            zonDepId: string;
            // public tipId: number,
            // public zonIdExpedicionDocumento: string,
            // public proBarrioComuna: string,
            // public proTipoVinculacionPersona: string,
            // public proDirtrad: string,
            // public proLatitud: number,
            // public proLongitud: number,
            // public proEstadoGeo: string,
            // public proActualizaPrimeraVez: number,
            // public detPropId: number,
             usuCreo: string;
             usuModifico: string;
             fecCreo: string;
             fecModifico: string;
            tip: TiposEntidades;
            //appProyectos: Proyecto[]
        //){}
    }
    
