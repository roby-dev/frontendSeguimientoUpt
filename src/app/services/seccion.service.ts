import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Seccion } from '../models/seccion.model';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class SeccionService {

  constructor(
    private http : HttpClient
  ) { }
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

  cargarSecciones() {
    const url = `${base_url}/seccion`;
    return this.http.get(url, this.headers).pipe(
      map((resp:{ok:boolean, secciones:Seccion[]}) => resp.secciones)
    );
  }

  obtenerSeccionPorId(id: string) {
    const url = `${base_url}/seccion/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; seccion: Seccion }) => resp.seccion));
  }

  crearSeccion(seccion: Seccion) {
    const url = `${base_url}/seccion`;
    return this.http.post(url, seccion, this.headers);
  }

  actualizarSeccion(seccion: Seccion) {
    const url = `${base_url}/seccion/${seccion._id}`;
    return this.http.put(url, seccion, this.headers);
  }

  borrarSeccion(_id: string) {
    const url = `${base_url}/seccion/${_id}`;
    return this.http.delete(url, this.headers);
  }

  cargarSeccionPorDocente(id:string){
    const url = `${base_url}/seccion/docente/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; secciones: Seccion[] }) => resp.secciones));
  }

  cargarSeccionPorCurso(id:string){
    const url = `${base_url}/seccion/curso/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; secciones: Seccion[] }) => resp.secciones));
  }
}
