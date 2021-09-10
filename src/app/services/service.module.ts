import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, AdminGuard, } from './service.index';
import { AdministracionService } from './administracion/administracion.service';
import { LoginService } from './login/login.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [AdministracionService, LoginService, SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, AdminGuard, ],
  declarations: []
})
export class ServiceModule { }
