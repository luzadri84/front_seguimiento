import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//pipes module
import { PipesModule } from '../pipes/pipes.module';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { FooterComponent } from './footer/footer.compontent';
import { DxLoadPanelModule } from 'devextreme-angular';

@NgModule({
    imports: [
        RouterModule,
        CommonModule, 
        PipesModule,
        DxLoadPanelModule,
    ],
    declarations: [
    NopagefoundComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
    ],
    exports: [
        NopagefoundComponent,
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent
    ]
  })
  export class SharedModule { }
