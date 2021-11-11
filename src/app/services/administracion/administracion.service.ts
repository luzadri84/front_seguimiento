import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
@Injectable({
    providedIn: 'root'
})
export class AdministracionService {

    constructor(public http: HttpClient, public router: Router) { }

    cargarTipoEntidadProponente(): Observable<any> {
        const url = environment.URL_API + 'parametria/tiposentidad';
        return this.http.get(url, { headers: { skip: "true" } });
    }

    cargarDepartamentos(): Observable<any> {
        const url = environment.URL_API + 'parametria/departamentos';
        return this.http.get(url);
    }

    cargarMunicipios(idDep: any): Observable<any> {
        const url = environment.URL_API + 'parametria/departamentos/' + idDep + '/municipios';
        return this.http.get(url);
    }

    cargarEntidadesFinancieras(): Observable<any> {
        const url = environment.URL_API + 'parametria/entidadesfinancieras';
        return this.http.get(url);
    }


    //#region Paramétricas Formulario B

    cargarTipoLinea(): Observable<any> {
        const url = environment.URL_API + 'parametria/lineas';
        return this.http.get(url);
    }

    cargarAreas(): Observable<any> {
        const url = environment.URL_API + 'parametria/areas';
        return this.http.get(url);
    }
    
    cargarTemasbyLinea(id: any){
        const url = environment.URL_API + 'parametria/linea/'+id+'/temas';
        return this.http.get(url);
    }
    
    cargarActividadesObligatorias(){
        const url = environment.URL_API + 'parametria/actividadesobligatorias';
        return this.http.get(url);
    }
    
    cargarIndicadorByLinea(LineaId: number): Observable<any> {
        const url = environment.URL_API + 'parametria/linea/' + LineaId + '/indicadores';
        return this.http.get(url);
    }
    
    cargarIndicadores(){
        const url = environment.URL_API + 'parametria/indicadores';
        return this.http.get(url);
    }

    cargarInidicadoresLineaMunicipioCategoria(){
        const url = environment.URL_API + 'parametria/indicadoreslineacategoriamunicipio';
        return this.http.get(url);
      }

      GetFuncionario(idPerfil: string): Observable<any>{
        const url = environment.URL_API + 'parametria/Usuario/'+ idPerfil +'/Funcionarios';
        return this.http.get(url);
      }
    
      GetEstados(): Observable<any>{
        const url = environment.URL_API + 'parametria/estados';
        return this.http.get(url);
      }
      GetZonas(): Observable<any>{
        const url = environment.URL_API + 'parametria/zonas';
        return this.http.get(url);
      }
    
    //#endregion

     //#region Paramétricas Formulario B
     
     GetActividades(): Observable<any>{
        const url = environment.URL_API + 'parametria/actividades';
        return this.http.get(url);
      }
     //#endregion

}