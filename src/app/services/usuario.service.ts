import { Router } from '@angular/router';
import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { PasswordForm } from '../interfaces/password-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { Seccion } from '../models/seccion.model';
import { NewPasswordForm } from '../interfaces/newPassword-form.interface';
import { CargarUsuarios } from '../interfaces/cargar-usuarioss.interface';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;
  public secciones : Seccion[] = [];
  public agregarSeccion:EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'DIRECTOR_ROLE'|'SUPERVISOR_ROLE' | 'DOCENTE_ROLE' {
    return this.usuario.role;
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    //TODO BORRAR MENU

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const {
            email,
            nombres,
            apellidos,
            role,
            imagen = '',
            uid,
          } = resp.usuarioDB;
          this.secciones = resp.secciones;
          this.usuario = new Usuario(
            nombres,
            apellidos,
            email,
            '',
            imagen,
            role,
            uid,
            '',
            this.secciones
          );
          this.guardarLocalStorage(resp.token, resp.menu);
          return true;
        }),

        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  crearUsuario(usuario: Usuario) {
    const url = `${base_url}/usuarios`;
    return this.http.post(url, usuario, this.headers);
  }

  actualizarPerfil(data: { email: string; nombre: string; role: string }) {
    data = {
      ...data,
      role: this.usuario.role,
    };

    return this.http.put(
      `${base_url}/usuarios/${this.uid}`,
      data,
      this.headers
    );
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(
      `${base_url}/usuarios/${usuario.uid}`,
      usuario,
      this.headers
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers).pipe(
      map((resp) => {
        const usuarios = resp.usuarios.map(
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
        return {
          total: resp.total,
          usuarios,
        };
      })
    );
  }

  cargarTodosUsuaris(){
    const url = `${base_url}/usuarios/todo/all`;
    return this.http
    .get<CargarUsuarios>(url, this.headers)
    .pipe(
      map((resp) => {
        const usuarios:Usuario[] = resp.usuarios.map(
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
        return {
          usuarios,
        };
      })
    );
  }

  eliminarUsuario(usuario: Usuario) {    //http://localhost:3000/api/usuarios/5f32bdd8c442be1b6c99cf86

    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  cargarUsuarioPorId(id: string) {
    const url = `${base_url}/usuarios/id/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(map((resp: { ok: boolean; usuario: Usuario }) => resp.usuario));
  }


  comprobarPassword(passwordForm:PasswordForm){
    return this.http.post(`${base_url}/usuarios/comprobar`,passwordForm,this.headers);
  }

  cambiarPassword(newPasswordForm:NewPasswordForm){
    return this.http.post(`${base_url}/usuarios/cambiar`,newPasswordForm,this.headers);
  }
}
