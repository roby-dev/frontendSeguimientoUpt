import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { Seccion } from 'src/app/models/seccion.model';
import { CursosService } from 'src/app/services/cursos.service';
import { SeccionService } from 'src/app/services/seccion.service';

@Component({
  selector: 'app-micurso',
  templateUrl: './micurso.component.html',
  styles: [
  ]
})
export class MicursoComponent implements OnInit {
  public cursoSeleccionado: Seccion;
  constructor(
    private seccionService:SeccionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarCurso(id);
    });
  }

  cargarCurso(id:string){

    if (id === 'nuevo') {
      return;
    }

    this.seccionService
      .obtenerSeccionPorId(id)
      .subscribe((seccion) => {
        if (!seccion) {
          //return this.router.navigateByUrl(`/dashboard/miscursos`);
        }
        this.cursoSeleccionado=seccion;
      });
  }
}
