import { Curso } from './curso.model';
import { Usuario } from './usuario.model';

export class Seccion{
  constructor(
    public nombre: string,
    public usuario:Usuario,
    public curso:Curso,
    public _id?: string,
  ){}
}

