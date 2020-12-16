import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Curso } from '../models/curso.model';
import { Seccion } from '../models/seccion.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) {}

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

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      (user) =>
        new Usuario(
          user.nombres,
          user.apellidos,
          user.email,
          '',
          user.imagen,
          user.role,
          user.uid
        )
    );
  }

  private transformarCurso(resultados: any[]): Curso[] {
    return resultados;
  }


  private transformarSeccion(resultados: any[]): Seccion[] {
    return resultados;
  }

  // private transformarSeccion(resultados: any[]): Seccion[] {
  //   return resultados;
  // }

  buscar(tipo: 'usuarios' | 'cursos' | 'secciones', termino: string = '') {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any>(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados);
          case 'cursos':
            return this.transformarCurso(resp.resultados);
          case 'secciones':
            return this.transformarSeccion(resp.resultados);
          default:
            return [];
        }
      })
    );
  }

  busquedaGlobal(termino: string) {
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<any>(url, this.headers);
  }
}
