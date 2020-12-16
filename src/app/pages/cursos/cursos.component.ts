import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Curso } from 'src/app/models/curso.model';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styles: [
  ]
})
export class CursosComponent implements OnInit {
  public cargando: boolean = true;
  public cursos : Curso[] = [];
  public ciclos = [];

  constructor(
    private cursosService : CursosService
  ) { }

  ngOnInit(): void {
    this.cargarCursosByCiclo();
  }


  cargarCursos(){
    this.cargando=true;
    this.cursosService.cargarCursos().subscribe((cursos:Curso[])=>{
      this.cursos = cursos;
      this.cargando=false;
    });
  }


  cargarCursosByCiclo(){
    this.cargando=true;
    this.ciclos = new Array();
    let curse = new Array();
    for (let i = 0; i < 10; i++) {
      this.cursosService.cargarCursosByCiclo(i+1).pipe(delay(50)).subscribe((cursos:Curso[])=>{
        curse = new Array();
        cursos.forEach(curso => {
          if(curso.ciclo==(i+1)){
            curse.push(curso);
          }
        });
        this.ciclos[i]=curse;
        //console.log(cursos);
        if(i==9){
          this.cargando=false;
        }
      });
    }
  }

  borrarCurso(curso:Curso){
    Swal.fire({
      title: '¿Borrar curso?',
      text: `Está a punto de borrar a ${curso.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar curso',
    }).then((result) => {
      if (result.value) {
        this.cursosService.borrarCurso(curso._id).subscribe(
          (resp) => {
            Swal.fire('Borrado!', 'El curso ha sido borrado', 'success');
            this.cargarCursosByCiclo();
          },
          (error) => {
            Swal.fire('Error!', error.error.msg, 'error');
            this.cargarCursosByCiclo();
          }
        );
      }
    });
  }
}
