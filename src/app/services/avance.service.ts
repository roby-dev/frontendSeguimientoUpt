import { Injectable } from '@angular/core';
import { Seccion } from '../models/seccion.model';
import { SeccionService } from './seccion.service';

@Injectable({
  providedIn: 'root'
})
export class AvanceService {
  public seccion :Seccion;
  constructor(
    private seccionService:SeccionService
  ) {

  }

  cargarSeccion(id:string){
    this.seccionService.obtenerSeccionPorId(id).subscribe((seccion)=>{
        this.seccion=seccion;
    });
  }
}
