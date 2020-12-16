import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Seccion } from 'src/app/models/seccion.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalPasswordService } from 'src/app/services/modal-password.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styles: [
  ]
})
export class ActualizarComponent implements OnInit {

  public usuarioForm: FormGroup;
  public usuarioSeleccionado: Usuario;
  public secciones:Seccion[] = [];
  public cargando:boolean=true;
  public seccion:boolean=false;
  private id:string;

  @Output() public usuario = new EventEmitter<Usuario>();


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService:UsuarioService,
    private seccionService:SeccionService,
    private modalService:ModalPasswordService
  ) { }

  mandarUsuario(usuario:Usuario){
    this.usuario.emit(usuario);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarUsuario(id);
      this.cargarSecciones(id);

      this.id=id;
    });

    this.usuarioForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role:['',Validators.required]
    });
  }

  cargarUsuario(id: string) {
    if (id=='') {
      return this.router.navigateByUrl(`/dashboard/usuarios`);
    }

    this.usuarioService
      .cargarUsuarioPorId(id)
      .subscribe((usuario) => {
        if (!usuario) {
          return this.router.navigateByUrl(`/dashboard/usuarios`);
        }
        const {
          nombres,
          apellidos,
          email,
          role,
        } = usuario;
        this.usuarioSeleccionado = usuario;
        this.usuarioForm.setValue({
          nombres,
          apellidos,
          email,
          role,
        });
        this.cargando=false;
      });

  }

  cargarSecciones(id:string){
    this.cargando=true;
    this.seccion=false;
    this.seccionService.cargarSeccionPorDocente(id)
      .subscribe((secciones:Seccion[])=>{
        this.secciones=secciones;
        this.cargando=false;
        if(this.secciones){
          this.seccion=true;
        }
      });
  }

  actualizarUsuario() {
    const { nombres,apellidos } = this.usuarioForm.value;
    if (this.usuarioSeleccionado) {
      const data = {
        ...this.usuarioForm.value,
        uid: this.usuarioSeleccionado.uid,
      };
      this.usuarioService.guardarUsuario(data).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `${nombres} ${apellidos} actualizado correctamente`,
          'success'
        );
      },
      (error) => {
          Swal.fire('Error!', error.error.msg, 'error');
      });
    }
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

}
