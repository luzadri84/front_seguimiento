import { Injectable } from "@angular/core";
import { CuentaUsuario } from "src/app/models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Session } from "src/app/models/session.model";

@Injectable()
export class UsuarioService {
  currentUser: string;
  private currentSession: Session = null;
  menu: any[] = [];
  
  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    this.cargarStorage();
  }
 
  getCurrentToken(): string {
    const _session = this.getCurrentSession();
    return _session && _session.access_token ? _session.access_token : null;
  }

  getCurrentUser(): CuentaUsuario {
    const session: Session = this.getCurrentSession();
    return session && session.user ? session.user : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  estalogueado() {
    return this.currentUser.length > 5 ? true : false;
  }

  logout() {
    this.currentUser = "";
    localStorage.removeItem("currentUser");
    localStorage.removeItem("storage");
    localStorage.removeItem("email");
    this.router.navigate(["/login"]);
  }

  cargarStorage() {
    if (localStorage.getItem("currentUser")) {
      const sessionStr = localStorage.getItem("currentUser");
      this.currentUser = sessionStr;
      this.currentSession = <Session>JSON.parse(sessionStr);
    } else {
      this.currentUser = "";
    }
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    localStorage.setItem("currentUser", JSON.stringify(session));
    this.currentUser = this.currentSession.access_token;
  }

}