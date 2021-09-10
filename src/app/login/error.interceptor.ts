import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioService } from "../services/service.index";
import Swal from "sweetalert2";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public authenticationService: UsuarioService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                // auto logout if 401 or 403 response returned from api
                Swal.fire('Sesión', 'Su sesión expiro, por favor ingresar nuevamente!', 'warning');
                this.authenticationService.logout();
            }
            let error = '';
            if(err) {
                if(err.statusText){
                    error = err.statusText
                }
                else {
                    if(err.error){
                        error = err.error.errores[0].descripcion
                    }
                }
            }
            return throwError(error);
        }))
    }
}