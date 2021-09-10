import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppBeneficiarios, FormularioB } from 'src/app/models/formulariob.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TrayectoriaProyecto,  AppPresupuestoDetalle } from 'src/app/models/formulariob.model';
import { Seguimientos } from 'src/app/models/seguimiento.model';
@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(public http: HttpClient) { }

  cargarProponenteById(id: number) {
    const url = environment.URL_API + 'negocio/proponente/' + id;
    return this.http.get(url);
  }

  cargarProponenbyProyecto(id: any) {
    const url = environment.URL_API + 'negocio/proponente/' + id + '/proyecto';
    return this.http.get(url);
  }

  cargarProyectoById(id: number) {
    const url = environment.URL_API + 'negocio/proyecto/' + id;
    return this.http.get(url);
  }

  cargarTemasByProyecto(id: any) {
    const url = environment.URL_API + 'negocio/proyecto/' + id + '/temas';
    return this.http.get(url);
  }

  ActualizarFormularioB(data: FormularioB) {
    const url = environment.URL_API + 'negocio/formularioB/';
    return this.http.put(url, data);
  }

  guardarProponente(data: any) {
    const url = environment.URL_API + 'negocio/Proponente/';
    return this.http.put(url, data);
  }
  guardarProyecto(data: any) {
    const url = environment.URL_API + 'negocio/proyecto/';
    return this.http.put(url, data);
  }
  cargarComponentesByProyecto(id: any) {
    const url = environment.URL_API + 'negocio/proyecto/' + id + '/componente';
    return this.http.get(url);
  }

  cargarCronogramaByProyecto(id: any){
    const url = environment.URL_API + 'negocio/proyecto/' + id + '/cronograma';
    return this.http.get(url);
  }

  cargarActividadesObligatoriasByProyecto(id: any){
    const url = environment.URL_API + 'negocio/proyecto/' + id + '/actividadesobligatorias';
    return this.http.get(url);
  }

  cargarValoresIndicador(proId: any){
    const url = environment.URL_API + 'negocio/proyecto/' + proId + '/valoresindicador';
    return this.http.get(url);
  }

  cargarValoresIndicadoresCategoriaMunicipio(proId: any){
    const url = environment.URL_API + 'negocio/proyecto/' + proId + '/valoresindicadorlineacategoriamunicipio';
    return this.http.get(url);
  }

  GetTrayectoriaByTipo(tipoTrayectoria: number): Observable<any>{
    const url = environment.URL_API + 'parametria/trayectorias/' + tipoTrayectoria;
    return this.http.get(url);
  }

  GetTrayectoria(): Observable<any>{
    const url = environment.URL_API + 'parametria/trayectorias/';
    return this.http.get(url);
  }

  GetConsultaTrayectoria(idProyecto: number): Observable<any>{
    const url = environment.URL_API + 'parametria/proyecto/'+ idProyecto + '/trayectorias' ;
    return this.http.get(url);
  }

  addTrayectoriasProyectos(trayectorias: TrayectoriaProyecto[]): Observable<any>{
    const url = environment.URL_API + 'negocio/trayectoria/' ;
    return this.http.put(url, trayectorias);
  }

  addPresupuestoProyectos(presupuesto: AppPresupuestoDetalle[]): Observable<any>{
    const url = environment.URL_API + 'negocio/presupuesto/' ;
    return this.http.put(url, presupuesto);
  }

  GuardarDocumentos(file: File, idProyecto:number): Observable<any>{
    const url = environment.URL_API + 'seguridad/CargarDocumento/'+ idProyecto ;
    return this.http.put(url, file);
  }

  GetTipoTrayectoria(): Observable<any>{
    const url = environment.URL_API + 'parametria/tipotrayectorias' ;
    return this.http.get(url);
  }

  GetPresupuestoDetalleTipo(): Observable<any>{
    const url = environment.URL_API + 'parametria/detallepresupuesto/';
    return this.http.get(url);
  }

  GetPresupuestoDetalle(idProyecto: number): Observable<any>{
    const url = environment.URL_API + 'parametria/proyecto/'+ idProyecto + '/presupuesto' ;
    return this.http.get(url);
  }

  GetPresupuestoDetalleTipoTitulos(): Observable<any>{
    const url = environment.URL_API + 'parametria/tipopresupuesto' ;
    return this.http.get(url);
  }

  GetAppDocumentosTipoEntidades(idPro: number): Observable<any>{
    const url = environment.URL_API + 'parametria/documentos/'+ idPro ;
    return this.http.get(url);
  }
    
  EnviarProyecto(id: number): Observable<any>{
    const url = environment.URL_API + 'negocio/proyecto/' + id + '/enviar' ;
    return this.http.post(url, null);
  }


  GetAppBeneficiados(idPro: number): Observable<any>{
    const url = environment.URL_API + 'parametria/proyecto/'+ idPro +'/beneficiario';
    return this.http.get(url);
  }

  ActualizarBeneficiado(data: AppBeneficiarios) {
    const url = environment.URL_API + 'negocio/beneficiados/';
    return this.http.put(url, data);
  }
  DescargarDocumento(idPro: number, nombre: string): Observable<Blob> {
    const url = environment.URL_API + 'parametria/documentos/'+ idPro + '/' + nombre + '/descargar';
    return this.http.get(url, { responseType: 'blob' });
  }

  GetAppResultado(idVigencia: number, depId: string, munId: string , proyecto: string , proponente: string, nroRadicacion: string): Observable<any>{
    const url = environment.URL_API + 'parametria/proyecto/'+idVigencia+'/'+ depId+'/'+ munId+'/'+ proyecto+'/'+ proponente+'/'+ proponente +'/resultado' ;
    return this.http.get(url, {headers:{skip:"true"}});
  }

  GetVigencia(): Observable<any>{
    const url = environment.URL_API + 'parametria/vigencia' ;
    return this.http.get(url, {headers:{skip:"true"}});
  }

  ActualizarSeguimiento(data: Seguimientos) {
    const url = environment.URL_API + 'negocio/seguimiento/';
    return this.http.put(url, data);  
  }


}