import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seccion } from 'src/app/models/seccion.model';
import { SeccionService } from 'src/app/services/seccion.service';

@Component({
  selector: 'app-miavance',
  templateUrl: './miavance.component.html',
  styles: [
  ]
})
export class MiavanceComponent implements OnInit {
  public cargando:boolean=true;
  public seccionSeleccionada:Seccion;
  constructor(
    private seccionService:SeccionService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarSeccion(id);
    });
  }

  cargarSeccion(id:string){
    if (id === 'nuevo') {
      return;
    }

    this.seccionService
      .obtenerSeccionPorId(id)
      .subscribe((seccion) => {
        if (!seccion) {
          //return this.router.navigateByUrl(`/dashboard/miscursos`);
        }
        this.seccionSeleccionada=seccion;
        this.cargando=false;
      });
  }

}
