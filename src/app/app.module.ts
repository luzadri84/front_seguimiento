import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';


// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';

// Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from "./create/create.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { NewPasscodeComponent } from "./newpasscode/newpasscode.component"
import { ConfirmComponent } from "./confirm/confirm.component"
import {ResultadosComponent} from "./resultados/resultados.component"
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
//import { DxDataGridModule, DxLoadPanelModule } from 'devextreme-angular';
import { ModaltextComponent } from './components/modaltext/modaltext.component';
import { AgmCoreModule } from '@agm/core';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import {DxAutocompleteModule, DxFormModule, DxValidatorModule, DxTextAreaModule, DxTagBoxModule, DxNumberBoxModule, DxTextBoxModule, DxAccordionModule, DxScrollViewModule, DxPopupModule, DxListModule, DxVectorMapModule, DxDataGridModule, DxLoadPanelModule, DxButtonModule, DxSelectBoxModule, DxFileUploaderModule, DxDateBoxModule, DxPivotGridModule, DxChartModule, DxPieChartModule, DxSchedulerModule, DxTemplateModule, DxCheckBoxModule } from 'devextreme-angular';
import { CrearComponenteComponent } from './crear-componente/crear-componente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateComponent,
    ForgotComponent,
    NewPasscodeComponent,
    ConfirmComponent,
    ModaltextComponent,
    HomeComponent,
    ResultadosComponent,
    CrearComponenteComponent,
    SeguimientoComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    DxDataGridModule,
    DxLoadPanelModule,
      DxDataGridModule,
        DxLoadPanelModule,
        DxPivotGridModule,
        DxChartModule,
        DxPieChartModule,
        DxSchedulerModule,
        DxTemplateModule,
        DxButtonModule,
        DxSelectBoxModule,
        DxFileUploaderModule,
        DxDateBoxModule,
        DxCheckBoxModule,
        DxSelectBoxModule,
        DxNumberBoxModule,
        BrowserModule,
        DxPopupModule,
        DxScrollViewModule,
        DxAccordionModule,
        DxTagBoxModule,
        DxTextBoxModule,
        DxTextAreaModule,
        DxButtonModule,
        DxValidatorModule,
        DxFormModule,
        DxAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1S_KatBI9RiyeU_VunIYDS6tWRr5QfsY',
      libraries: ['geometry', 'places', 'drawing'],
    }),
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({}),
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
