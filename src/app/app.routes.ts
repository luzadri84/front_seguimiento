import { RouterModule, Routes } from "@angular/router";

//Componentes
import { LoginComponent } from "./login/login.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { HomeComponent } from "./home/home.component";
import { CreateComponent } from "./create/create.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { NewPasscodeComponent } from "./newpasscode/newpasscode.component";
import { ConfirmComponent } from "./confirm/confirm.component";
import { ResultadosComponent} from "./resultados/resultados.component"
import { CrearComponenteComponent} from "./crear-componente/crear-componente.component"
import { SeguimientoComponent } from './seguimiento/seguimiento.component';

const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "create", component: CreateComponent },
  { path: "forgot", component: ForgotComponent },
  { path: "newpasscode", component: NewPasscodeComponent },
  { path: "login", component: LoginComponent },
  { path: "confirm", component: ConfirmComponent },
  { path: "resultados", component: ResultadosComponent },
  { path: "crearComponente", component: CrearComponenteComponent },
  { path: 'seguimiento', component: SeguimientoComponent},
  { path: "**", component: NopagefoundComponent },
  
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
