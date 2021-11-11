import { NgModule, Injectable } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { FormularioComponent } from './formulario/formulario.component';
// Modulos
import { SharedModule } from '../shared/shared.modules';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectModule } from 'ng-select';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

// Pipe Modules
import { PipesModule } from '../pipes/pipes.module';
// Rutas
import { PAGES_ROUTES } from './pages.routes';
import { ChartsModule } from 'ng2-charts';
// componentes
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import {DxAutocompleteModule, DxFormModule, DxValidatorModule, DxTextAreaModule, DxTagBoxModule, DxNumberBoxModule, DxTextBoxModule, DxAccordionModule, DxScrollViewModule, DxPopupModule, DxListModule, DxVectorMapModule, DxDataGridModule, DxLoadPanelModule, DxButtonModule, DxSelectBoxModule, DxFileUploaderModule, DxDateBoxModule, DxPivotGridModule, DxChartModule, DxPieChartModule, DxSchedulerModule, DxTemplateModule, DxCheckBoxModule } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbDateStruct, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { EqualValidator } from '../directive/equal-validator.directive';
import { NgxLoadingModule } from 'ngx-loading';
import { CurrencyPipe } from '@angular/common';
import { TokenInterceptor } from '../login/token.interceptor';
import { ErrorInterceptor } from '../login/error.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormularioBComponent } from './formulariob/formulariob.component';
import { ActualizacionComponent } from './actualizacion/actualizacion.component';
import { DocumentosComponent } from './documentos/documentos.component';
//import { EnviarComponent } from './enviar/enviar.component';

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('.');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { day: toInteger(dateParts[0]), month: null, year: null };
            } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: null };
            } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: toInteger(dateParts[2]) };
            }
        }
        return null;
    }

    format(date: NgbDateStruct): string {
        return date ?
            `${isNumber(date.day) ? padNumber(date.day) : ''}/${isNumber(date.month) ? padNumber(date.month) : ''}/${date.year}` :
            '';
    }
}

export function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return '';
    }
}

export function isNumber(value: any): value is number {
    return !isNaN(toInteger(value));
}

export function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

@Injectable()
export class NgbUTCStringAdapter extends NgbDateAdapter<string> {

    fromModel(date: string): NgbDateStruct {
        return (date && Number(date.substring(0, 2)) && Number(date.substring(3, 5) + 1) && Number(date.substring(6, 10))) ?
            {
                year: Number(date.substring(6, 10)),
                month: Number(date.substring(3, 5)),
                day: Number(date.substring(0, 2))
            } : null;
    }

    toModel(date: NgbDateStruct): string {
        return date ? String('00' + date.day).slice(-2) + '/' + String('00' + date.month).slice(-2) + '/' + date.year.toString() : null;
    }
}

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: ErrorInterceptor, 
            multi: true 
        },
        {
            provide: NgbDateParserFormatter,
            useClass: NgbDateCustomParserFormatter
        },
        {
            provide: NgbDateAdapter,
            useClass: NgbUTCStringAdapter
        }, CurrencyPipe,
    ],
    declarations: [
        DashboardComponent,
        FormularioComponent,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        ProfileComponent,
        EqualValidator,
        FormularioBComponent,
        ActualizacionComponent,
        
        DocumentosComponent,
        //EnviarComponent
    ],
    exports: [
        DashboardComponent,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
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
        //DxFormComponent,
        NgbModule,
        NgSelectModule,
        SelectModule,
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyD1S_KatBI9RiyeU_VunIYDS6tWRr5QfsY' }),
        AgmJsMarkerClustererModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        NgxLoadingModule.forRoot({}),
        DxVectorMapModule,
        DxListModule,
    ],
})
export class PagesModule { }