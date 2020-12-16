import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Curso } from 'src/app/models/curso.model';
import { Seccion } from 'src/app/models/seccion.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CursosService } from 'src/app/services/cursos.service';
import { ModalService } from 'src/app/services/modal.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styles: [
  ]
})
export class SeccionComponent implements OnInit {

  public seccionForm: FormGroup;
  public cursos:Curso[] = [];
  public cursoSeleccionado:Curso;
  public docentes:Usuario[] =[];
  public docenteSeleccionado:Usuario;
  public seccionSeleccionada:Seccion;
  private cursoSubs:Subscription;
  private docenteSubs:Subscription;
  public docenteTemp:string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cursoService:CursosService,
    private usuarioService:UsuarioService,
    private seccionService:SeccionService,
    private modalService:ModalService

  ) { }

  ngOnInit(): void {

    this.seccionForm = this.fb.group({
      nombre:['',Validators.required],
      nombreusuario: ['', Validators.required],
      nombrecurso: ['', Validators.required],
      curso:['',Validators.required],
      usuario:['',Validators.required]
    });

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarSeccion(id);
    });

    this.cargarDocentes();

    this.cargarCursos();



    this.cursoSubs = this.modalService.seleccionCurso.pipe(delay(50)).subscribe((id)=>{
      this.cursoService.obtenerCursoPorId(id)
      .subscribe((curso:Curso)=>{
        this.seccionForm.get('nombrecurso').setValue(curso.nombre);
        this.seccionForm.get('nombre').setValue(curso.nombre);
        this.seccionForm.get('curso').setValue(curso._id);
        this.cursoSeleccionado=curso;
        this.modalService.cerrarModal();
      });
    });

    this.docenteSubs=this.modalService.seleccionUsuario.pipe(delay(50)).subscribe((id)=>{
      this.usuarioService.cargarUsuarioPorId(id)
      .subscribe((usuario:Usuario)=>{
        this.seccionForm.get('nombreusuario').setValue(usuario.nombres + ' '+usuario.apellidos);
        this.seccionForm.get('usuario').setValue(usuario.uid);
        this.modalService.cerrarModal();
        this.docenteSeleccionado=usuario;
      });
    })

  }

  cargarCursos() {
    this.cursoService
      .cargarCursos()
      .subscribe((cursos: Curso[]) => {
        this.cursos = cursos;
      });
  }

  cargarDocentes(){
    this.usuarioService.cargarTodosUsuaris()
    .subscribe(({usuarios})=>{
      this.docentes=usuarios;
      console.log(this.docentes);
    });
  }

  abrirModal(tipo:'usuarios'|'cursos'){
    this.modalService.abrirModal(tipo);
  }


  cargarSeccion(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.seccionService
      .obtenerSeccionPorId(id)
      .pipe(delay(50))
      .subscribe((seccion) => {
        if (!seccion) {
          return this.router.navigateByUrl(`/dashboard/secciones`);
        }

        let userid=seccion.usuario._id;
        let cursoid=seccion.curso._id;
        let curso=seccion.curso.nombre;
        let username=seccion.usuario.nombres + ' ' + seccion.usuario.apellidos;
        const {
          nombre,
        } = seccion;
        console.log();
        this.seccionSeleccionada = seccion;
        this.seccionForm.setValue({
          nombre,
          usuario:userid,
          curso:cursoid,
          nombrecurso:curso,
          nombreusuario:username
        });

        this.usuarioService.cargarUsuarioPorId(userid).subscribe((usuario:Usuario)=>{
          this.docenteSeleccionado=usuario;
          this.docenteTemp=usuario.uid;
        })

        this.cursoService.obtenerCursoPorId(cursoid).subscribe((curso:Curso)=>{
          this.cursoSeleccionado=curso;
        })
      });
  }

  guardarSeccion() {
    const { nombre,usuario } = this.seccionForm.value;
    if (this.seccionSeleccionada) {
      const data = {
        ...this.seccionForm.value,
        _id: this.seccionSeleccionada._id,
      };
      this.seccionService.actualizarSeccion(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );

        this.usuarioService.agregarSeccion.emit(this.docenteSeleccionado.uid);
        if(this.docenteTemp==this.usuarioService.usuario.uid){
          this.usuarioService.agregarSeccion.emit(this.docenteTemp);
        }
        this.router.navigateByUrl(`/dashboard/secciones`);
      },
      (error) => {
          Swal.fire('Error!', error.error.msg, 'error');
      });
    } else {
      this.seccionService
        .crearSeccion(this.seccionForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');

            this.usuarioService.agregarSeccion.emit(this.docenteSeleccionado.uid);


          this.seccionForm.reset();
          this.seccionForm = this.fb.group({
            nombrecurso:['',Validators.required],
            nombreusuario: ['', Validators.required],
            curso: ['', Validators.required],
          });

          this.router.navigateByUrl(`/dashboard/secciones`);
        },(error) => {
          Swal.fire('Error!', error.error.msg, 'error');
      });
    }
  }

}







