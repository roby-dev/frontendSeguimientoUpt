import { Seccion } from './seccion.model';

export class Silabus{
  constructor(
    public seccion: Seccion,
    public semanas:number,
    public conceptual:[{
      semana:number,
      contenidoConceptual:string
    }],
    public procedimental:[{
      semana:number,
      contenidoProcedimental:string
    }],
    public _id?:string,
  ){}
}

