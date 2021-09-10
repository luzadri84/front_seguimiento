import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { UsuarioService } from "../services/service.index";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: UsuarioService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = request.headers;
    if (
      !(
        request.url.toString().includes("token") ||
        request.url.toString().includes("forgot")
      )
    ) {
      if (request.headers.get("skip"))
           return next.handle(request);
          
      const expiry = (JSON.parse(atob(this.auth.getCurrentToken().split('.')[1]))).exp;
      let value = (Math.floor((new Date).getTime() / 1000)) >= expiry;
      if(value) {
        console.log('Expiro el token');
        this.auth.logout();
      }
     
      headers = request.headers
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${this.auth.getCurrentToken()}`);
    }
    //Informar al usuario que finalizó la convocatoria.
    const cloneReq = request.clone({ headers });
    return next.handle(cloneReq);
  }

 
  public tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}
