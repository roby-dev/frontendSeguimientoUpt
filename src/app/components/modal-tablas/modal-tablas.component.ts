import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CursosService } from 'src/app/services/cursos.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-tablas',
  templateUrl: './modal-tablas.component.html',
  styles: [
  ]
})
export class ModalTablasComponent implements OnInit {

  private txtTermino:HTMLInputElement;

  constructor(
    public modalTablasService:ModalService,
    public cursoService:CursosService

  ) {

   }

  ngOnInit(): void {

 }

 buscar(termino :string, tipo:'usuarios'| 'cursos'){

   switch(tipo){
    case 'usuarios':
      if(termino.length===0){
       return this.modalTablasService.cargar(tipo);
      }
      this.modalTablasService.buscar(tipo,termino);
      break;
    case 'cursos':
      if(termino.length===0){
        return this.modalTablasService.cargar(tipo);
       }
       this.modalTablasService.buscar(tipo,termino);
      break;
   }
 }

  cerrarModal(){
    this.txtTermino=<HTMLInputElement>document.getElementById('txtTermino');
    this.txtTermino.value="";
    this.modalTablasService.cerrarModal();
  }

  elegirCurso(objeto:Curso){
    this.modalTablasService.seleccionCurso.emit(objeto._id);
  }
  elergirUsuario(objeto:Usuario){
    this.modalTablasService.seleccionUsuario.emit(objeto.uid);
  }
}
