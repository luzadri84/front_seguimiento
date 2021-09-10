import { Component, OnInit, ViewChild } from '@angular/core';
import { dateFormatter } from 'globalize';
import moment from 'moment';
import { AppBeneficiarios, AppDocumentosTipoEntidades, Busqueda, Departamentos, Municipios, Resultado, Vigencia } from 'src/app/models/formulariob.model';
import { FormularioService } from 'src/app/services/formulario/formulario.service';
import { AdministracionService } from '../services/administracion/administracion.service';
import { CrearComponenteComponent } from 'src/app/crear-componente/crear-componente.component';
import { FormularioComponent } from 'src/app/pages/formulario/formulario.component';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  @ViewChild(CrearComponenteComponent, {static: false}) crearComponente: CrearComponenteComponent;

  @ViewChild(FormularioComponent, {static: false}) proponente: FormularioComponent;

  resultadoConvocatoria: Resultado[];
  listaDepartamentos: Departamentos[] = [];
  listaMunicipios: Municipios[] = [];
  popupVisible=  false;
  popupVisibleN=  false;
  busqueda: Busqueda = new Busqueda();
  vigencia: Vigencia[] = [];
  currentYear:Date;

  constructor(public _formularioService: FormularioService,public _administracionService: AdministracionService) { }

  ngOnInit() {
    var anio = moment(new Date()).format('YYYY');

    this.cargarDepartamentos();
    
    this._formularioService.GetAppResultado(1 ,'0', '0','0', '0', '0' ).subscribe((res) => {
      this.resultadoConvocatoria = res;
    })
    this._formularioService.GetVigencia().subscribe((res) => {
      this.vigencia = res;
    })
  }
  cargarDepartamentos() {
    this._administracionService.cargarDepartamentos().subscribe((res) => {
      this.listaDepartamentos = res;
    });
  }

  enviarMensaje() {

    this.crearComponente.saludo('hola desde el padre');

  }

  cargarMunicipios(departamentoId: any) {
    this._administracionService
      .cargarMunicipios(departamentoId)
      .subscribe((res) => {
        this.listaMunicipios = res;
      });
  }
  // changeDepartamento(departamentoId: any) {
  //   alert(departamentoId.value);
  //   this.cargarMunicipios(departamentoId);
  // }
  showPop(proyecto) {
    
    this.popupVisible = true;
    //this.VerificaRadicacion.IncId = proyecto.IncId; 
    
  }
  showPopN(proyecto) {
    
    this.popupVisibleN = true;
    //this.VerificaRadicacion.IncId = proyecto.IncId; 
    
  }
  form_fieldDataChanged(e: any) {
    let updatedField = e.dataField;
    let newValue = e.value;
    if (updatedField == 'DepId') {
      if (newValue != null) {
        this.cargarMunicipios(newValue);
      }
    }
  }

  Buscar(e: any) {
if(this.busqueda.VigId == undefined)
{
  this.busqueda.VigId = 0;
}
if(this.busqueda.DepId == undefined)
{
  this.busqueda.DepId = '0';
}
if(this.busqueda.MunId == undefined)
{
  this.busqueda.MunId = '0';
}
if(this.busqueda.Proyecto == undefined)
{
  this.busqueda.Proyecto = '0';
}
if(this.busqueda.Proponente == undefined)
{
  this.busqueda.Proponente = '0';
}
if(this.busqueda.nroRadicacion == undefined)
{
  this.busqueda.nroRadicacion = '0';
}

    this._formularioService.GetAppResultado(this.busqueda.VigId ,this.busqueda.DepId, this.busqueda.MunId,this.busqueda.Proyecto, this.busqueda.Proponente, this.busqueda.nroRadicacion).subscribe((res) => {
      this.resultadoConvocatoria = res;
    })
  }

}
