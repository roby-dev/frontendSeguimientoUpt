import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

import { delay } from 'rxjs/operators';

import { Subscription } from 'rxjs';
import { Curso } from 'src/app/models/curso.model';
import { CursosService } from 'src/app/services/cursos.service';
import { Title } from '@angular/platform-browser';
import { PlanEstudios } from 'src/app/models/plan.model';
import { PlanService } from 'src/app/services/plan.service';
import { Seccion } from 'src/app/models/seccion.model';
import { SeccionService } from 'src/app/services/seccion.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styles: [
  ]
})
export class CursoComponent implements OnInit {
  public cursoForm: FormGroup;
  public planes:PlanEstudios[] = [];
  public planSeleccionado:PlanEstudios;
  public cursoSeleccionado: Curso;
  public secciones:Seccion[] = [];
  public cargando:boolean=true;
  public seccion:boolean=false;
  private id:string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cursoService:CursosService,
    private planService:PlanService,
    private seccionService:SeccionService
  ) { }

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      planEstudios:['',Validators.required],
      codigo: ['', Validators.required],
      facultad: ['', Validators.required],
      escuela: ['', Validators.required],
      nombre: ['', Validators.required],
      ciclo: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarCurso(id);
      this.cargarSecciones(id);
      this.id=id;
    });

    this.cargarPlanes();
  }

  cargarSecciones(id:string){
    this.cargando=true;
    this.seccion=false;
    this.seccionService.cargarSeccionPorCurso(id)
      .subscribe((secciones:Seccion[])=>{
        this.secciones=secciones;

        if(this.secciones){
          this.seccion=true;
        }
      });
  }

  borrarSeccion(seccion:Seccion){
    Swal.fire({
      title: '¿Borrar Sección?',
      text: `Está a punto de borrar a ${seccion.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar sección',
    }).then((result) => {
      if (result.value) {
        this.seccionService.borrarSeccion(seccion._id).subscribe(
          (resp) => {
            Swal.fire('Borrado!', 'La sección ha sido borrada', 'success');
            this.cargarSecciones(this.id);
          },
          (error) => {
            Swal.fire('Error!', error.error.msg, 'error');
          }
        );
      }
    });
  }

  cargarPlanes() {
    this.planService
      .cargarPlanes()
      .subscribe((planes: PlanEstudios[]) => {
        this.planes = planes;
      });
  }


  cargarCurso(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.cursoService
      .obtenerCursoPorId(id)
      .pipe(delay(50))
      .subscribe((curso) => {
        if (!curso) {
          return this.router.navigateByUrl(`/dashboard/cursos`);
        }
        const {
          codigo,
          facultad,
          escuela,
          nombre,
          ciclo,
          planEstudios:{_id},
        } = curso;
        console.log(_id);
        this.cursoSeleccionado = curso;
        this.cursoForm.setValue({
          codigo,
          facultad,
          escuela,
          nombre,
          ciclo,
          planEstudios:_id,
        });
      });
  }



  guardarCurso() {
    const { nombre } = this.cursoForm.value;
    if (this.cursoSeleccionado) {
      const data = {
        ...this.cursoForm.value,
        _id: this.cursoSeleccionado._id,
      };
      this.cursoService.actualizarCurso(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );
        this.router.navigateByUrl(`/dashboard/cursos`);
      },
      (error) => {
          Swal.fire('Error!', error.error.msg, 'error');
      });
    } else {
      this.cursoService
        .crearCurso(this.cursoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.cursoForm.reset();
          this.cursoForm = this.fb.group({
            planEstudios:['',Validators.required],
            codigo: ['', Validators.required],
            facultad: ['', Validators.required],
            escuela: ['', Validators.required],
            nombre: ['', Validators.required],
            ciclo: ['', Validators.required],
          });
          this.router.navigateByUrl(`/dashboard/curso/nuevo`);
        }, (error) => {
          Swal.fire('Error!', error.error.msg, 'error');
        });
    }
  }

  mandarCurso(curso :Curso){

  }

}
