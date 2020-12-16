import { environment } from 'src/environments/environment';
import { Seccion } from './seccion.model';

const base_url = environment.base_url;

export class Usuario {
  constructor(
    public nombres: string,
    public apellidos: string,
    public email: string,
    public password?: string,
    public imagen?: string,
    public role?: 'DIRECTOR_ROLE' | 'SUPERVISOR_ROLE' | 'DOCENTE_ROLE',
    public uid?: string,
    public _id?: string,
    public secciones?:Seccion[]
  ) {}

  get imagenUrl() {
    //http://localhost:3000/api/upload/usuario/123231

    if (!this.imagen) {

      return `${base_url}/upload/usuarios/no-image`;
    } else if (this.imagen.includes('https')) {

      return this.imagen;
    } else if (this.imagen) {

      return `${base_url}/upload/usuarios/${this.imagen}`;
    } else {

      return `${base_url}/upload/usuarios/no-image`;
    }
  }
}
