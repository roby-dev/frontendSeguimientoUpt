import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso.model';
import { CargarCurso } from '../interfaces/cargar-cursos.interface';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http:HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  cargarCursos() {
    const url = `${base_url}/cursos`;
    return this.http
    .get(url, this.headers)
    .pipe(
      map((resp:{ok:boolean, cursos:Curso[]}) =>
        resp.cursos
      )
    );
  }


  cargarCursosByCiclo(ciclo:number) {
    const url = `${base_url}/cursos/ciclo/${ciclo}`;
    return this.http.get(url, this.headers).pipe(
      map((resp:{ok:boolean, cursos:Curso[]}) => resp.cursos)
    );
  }

  obtenerCursoPorId(id: string) {
    const url = `${base_url}/cursos/id/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; curso: Curso }) => resp.curso));
  }

  crearCurso(curso: Curso) {
    const url = `${base_url}/cursos`;
    return this.http.post(url, curso, this.headers);
  }

  actualizarCurso(curso: Curso) {
    const url = `${base_url}/cursos/${curso._id}`;
    return this.http.put(url, curso, this.headers);
  }

  borrarCurso(_id: string) {
    const url = `${base_url}/cursos/${_id}`;
    return this.http.delete(url, this.headers);
  }
}


