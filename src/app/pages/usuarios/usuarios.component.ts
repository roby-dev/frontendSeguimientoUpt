import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number = 0;
  public desde: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public cargando: boolean = true;

  constructor(
    private usuarioService : UsuarioService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // buscar(termino: string) {
  //   if (termino.length === 0) {
  //     return (this.usuarios = this.usuariosTemp);
  //   }

  //   this.busquedasService
  //     .buscar('usuarios', termino)
  //     .subscribe((resp: Usuario[]) => {
  //       this.usuarios = resp;
  //     });
  // }


  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
      console.log(this.desde);
    }

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;

    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        if (usuarios.length !== 0) {
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        }
      });
  }

  cambiarRole(usuario :Usuario){
    this.usuarioService.guardarUsuario(usuario).subscribe();
  }

  buscar(termino:string){
    if(termino.length==0){
     return(this.usuarios=this.usuariosTemp);
    }else{
      this.busquedaService.buscar('usuarios',termino).subscribe((usuarios:Usuario[])=>{
        this.usuarios=usuarios;
      });
    }
  }

  borrarUsuario(usuario:Usuario){
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a sí mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de borrar a ${usuario.nombres} ${usuario.apellidos}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar usuario',
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
          Swal.fire('Borrado!', 'El usuario ha sido borrado', 'success');
          this.cargarUsuarios();
        },(error)=>{
          Swal.fire('Error!', 'No puede borrarse a sí mismo', 'error');
        });
      }
    });
  }
}
