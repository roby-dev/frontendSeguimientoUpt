import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Seccion } from 'src/app/models/seccion.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: []
})
export class SeccionesComponent implements OnInit {

  public cargando: boolean = true;
  public secciones : Seccion[] = [];


  constructor(
    private seccionService :SeccionService,
    private usuarioService:UsuarioService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarSecciones();
  }


  buscar(termino:string){
    if(termino.length==0){
      this.seccionService
      .cargarSecciones()
      .subscribe(( secciones) => {
        this.secciones=secciones;
      });
    }else{
      this.busquedaService.buscar('secciones',termino).subscribe((secciones:Seccion[])=>{
        this.secciones=secciones;
      });
    }
  }

  borrarSeccion(seccion :Seccion){
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
            this.cargarSecciones();
            this.usuarioService.agregarSeccion.emit(seccion.usuario._id);
          },
          (error) => {
            Swal.fire('Error!', error.error.msg, 'error');
          }
        );
      }
    });
  }


  cargarSecciones(){
    this.cargando=true;
    this.seccionService
    .cargarSecciones()
    .subscribe(( secciones) => {
      this.secciones=secciones;
      this.cargando=false;
    });
  }

}
