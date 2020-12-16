import {PlanEstudios} from './plan.model';

export class Curso{
  constructor(
    public codigo: string,
    public facultad:string,
    public escuela:string,
    public nombre: string,
    public ciclo:number,
    public planEstudios?:PlanEstudios,
    public _id?: string,
  ){}
}

