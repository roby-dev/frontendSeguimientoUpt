import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { Seccion } from 'src/app/models/seccion.model';
import { AvanceService } from 'src/app/services/avance.service';
import { CursosService } from 'src/app/services/cursos.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { SilaboService } from 'src/app/services/silabo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-micurso',
  templateUrl: './micurso.component.html',
  styles: [
  ]
})
export class MicursoComponent implements OnInit {
  public seccionSeleccionada: Seccion;
  public cargando:boolean=true;
  public id:string="";
  constructor(
    private seccionService:SeccionService,
    private activatedRoute: ActivatedRoute,
    private avanceService:AvanceService,
    private router: Router,
    private silaboService:SilaboService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarCurso(id);
      localStorage.setItem("seccion",id);
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
        this.seccionSeleccionada=seccion;
        this.cargando=false;
      });
    this.silaboService
    .cargarSilaboBySeccion(id)
    .subscribe((silabo)=>{
      if(!silabo){
        return;
      }else{
        this.id=silabo._id;
      }
    })
  }

  enviarAvance(){
    Swal.fire({
      title: '¿Enviar avance?',
      text: `Está a punto de enviar su avance`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, enviar mi avance',
    }).then((result) => {
      if (result.value) {
            Swal.fire('Enviado!', 'El avance ha sido enviado', 'success');
          }
    });
  }
}
