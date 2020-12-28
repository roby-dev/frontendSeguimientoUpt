import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Silabus } from '../models/silabus.mode';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SilaboService {

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

  cargarSilabos() {
    const url = `${base_url}/silabo`;
    return this.http.get(url, this.headers).pipe(
      map((resp:{ok:boolean, silabos:Silabus[]}) => resp.silabos)
    );
  }

  obtenerSilaboPorId(id: string) {
    const url = `${base_url}/silabo/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; silabo: Silabus }) => resp.silabo));
  }

  crearSilabo(silabo: Silabus) {
    const url = `${base_url}/silabo`;
    return this.http.post(url, silabo, this.headers);
   }


   actualizarSilabus(silabo: Silabus) {
    const url = `${base_url}/silabo/${silabo._id}`;
    return this.http.put(url, silabo, this.headers);
  }

  borrarSilabo(_id: string) {
    const url = `${base_url}/silabo/${_id}`;
    return this.http.delete(url, this.headers);
  }

  cargarSilaboBySeccion(id:string){
    const url = `${base_url}/silabo/seccion/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; silabo: Silabus}) => resp.silabo));
  }

  // cargarSeccionPorCurso(id:string){
  //   const url = `${base_url}/seccion/curso/${id}`;
  //   return this.http
  //     .get(url, this.headers)
  //     .pipe(map((resp: { ok: boolean; secciones: Seccion[] }) => resp.secciones));
  // }
}
