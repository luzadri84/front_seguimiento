//Router
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { PagesComponent } from './pages.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FormularioBComponent } from "./formulariob/formulariob.component";
import { ActualizacionComponent } from './actualizacion/actualizacion.component';
//import { SeguimientoComponent } from './seguimiento/seguimiento.component';
//import { EnviarComponent } from './enviar/enviar.component';
//import { DocumentosComponent } from './documentos/documentos.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      //{ path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'formulario', component: FormularioComponent, data: { titulo: 'Proponente' } },
      { path: 'formularioB', component: FormularioBComponent, data: { titulo: 'Proyecto' } },
      { path: 'actualizacion', component: ActualizacionComponent, data: { titulo: 'Actualizaciones' } },
      //{ path: 'documentos', component: DocumentosComponent, data: { titulo: 'Cargar documentos' } },
      //{ path: 'enviar', component: EnviarComponent, data: { titulo: 'Enviar proyecto' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema' } },
      { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
      { path: '', redirectTo: '/formulario', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
