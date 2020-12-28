import { Component, OnInit } from '@angular/core';
import { Silabus } from 'src/app/models/silabus.mode';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { SilaboService } from 'src/app/services/silabo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-silabos',
  templateUrl: './silabos.component.html',
  styles: [
  ]
})
export class SilabosComponent implements OnInit {
  public cargando: boolean = true;
  public silabus:Silabus[]=[];


  constructor(
    private silaboService:SilaboService,
    private seccionService :SeccionService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarSilabos();
  }

  cargarSilabos(){
    this.cargando=true;
    this.silaboService
    .cargarSilabos()
    .subscribe(( silabos) => {
      this.silabus=silabos;
      this.cargando=false;
    });
  }

  borrarSilabo(silabo:Silabus){
    Swal.fire({
      title: '¿Borrar Contenido?',
      text: `Está a punto de borrar el contenido de ${silabo.seccion.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar contenido',
    }).then((result) => {
      if (result.value) {
        this.silaboService.borrarSilabo(silabo._id).subscribe(
          (resp) => {
            Swal.fire('Borrado!', 'El contenido ha sido borrado', 'success');
            this.cargarSilabos();
          },
          (error) => {
            Swal.fire('Error!', error.error.msg, 'error');
          }
        );
      }
    });
  }

  buscar(termino:string){

  }
}
