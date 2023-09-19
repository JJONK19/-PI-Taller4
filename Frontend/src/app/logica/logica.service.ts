import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API } from "../URL/URL";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LogicaService {

  private registro: string = "";

  constructor(private http: HttpClient) { }

  //Usuario
  login(registro: string) {
    this.registro = registro;
  }

  logout() {
    this.registro = "";
  }

  getUsername(): string {
    return this.registro;
  }

  //Conexiones 
  crearUsuario(entrada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(API + 'create-user', entrada, httpOptions);
  }

  loginUsuario(entrada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(API + 'login', entrada, httpOptions);
  }

  recoveryUsuario(entrada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(API + 'recovery-password', entrada, httpOptions);
  }

}
