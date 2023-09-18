import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API } from "../URL/URL";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LogicaService {

  private username: string | null = null;

  constructor(private http: HttpClient) { }

  //Usuario
  login(username: string) {
    this.username = username;
  }

  logout() {
    this.username = null;
  }

  getUsername(): string | null {
    return this.username;
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
