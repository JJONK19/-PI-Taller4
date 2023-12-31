import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API } from "../URL/URL";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LogicaService {

  private registro: string = ""; 
  private post: number = 0;
  private perfil: string = "";

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

  setPerfil(registro: string) {
    this.perfil = registro;
  }

  getPerfil(): string {
    return this.perfil;
  }

  //Publicaciones
  guardarPost(id: number) {
    this.post = id;
  }

  getPost() {
    return this.post;
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

  getCursos(): Observable<string[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get<{ cursos: string[] }>(API + 'getCursos', httpOptions)
      .pipe(
        map((data: { cursos: string[] }) => data.cursos)
      );
  }
  
  getCatedraticos(): Observable<string[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get<{ catedraticos: string[] }>(API + 'getCatedraticos', httpOptions)
      .pipe(
        map((data: { catedraticos: string[] }) => data.catedraticos)
      );
  }

  getPublicaciones(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get<any[]>(API + 'getPublicaciones', httpOptions);
  }
  
  getPublicacion(entrada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(API + 'getPublicacion', entrada, httpOptions);
  }

  searchPublicacionCurso(entrada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(API + 'searchPublicacionCurso', entrada, httpOptions);
  }

  searchPublicacionCatedratico(entrada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(API + 'searchPublicacionCatedratico', entrada, httpOptions);
  }

  getComentarios(entrada: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any[]>(API + 'getComentarios', entrada,  httpOptions);
  } 

  addComentario(entrada: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any[]>(API + 'addComentario', entrada,  httpOptions);
  }

  getUserData(entrada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(API + 'getUserData', entrada, httpOptions);
  }

  searchUser(entrada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(API + 'searchUser', entrada, httpOptions);
  }

  getCursosExistentes(): Observable<string[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get<{ cursos: string[] }>(API + 'getCursosExistentes', httpOptions)
      .pipe(
        map((data: { cursos: string[] }) => data.cursos)
      );
  }

  publicar(entrada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(API + 'publicar', entrada, httpOptions);
  }

  addCursoAprobado(entrada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(API + 'addCursoAprobado', entrada, httpOptions);
  }

  getCursoAprobado(entrada: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(API + 'getCursosAprobados', entrada, httpOptions)
    .pipe(
      map((data: { cursos: string[] }) => data.cursos)
    );
  }

  getCursosPendientes(entrada: any): Observable<string[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<{ cursos: string[] }>(API + 'getCursosPendientes', entrada, httpOptions)
      .pipe(
        map((data: { cursos: string[] }) => data.cursos)
      );
  }
}
