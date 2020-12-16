import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso.model';
import { Usuario } from '../models/usuario.model';
import { BusquedaService } from './busqueda.service';
import { BusquedasService } from './busquedas.service';
import { CursosService } from './cursos.service';
import { UsuarioService } from './usuario.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultarModal: boolean = true;
  public tipo:'cursos' | 'usuarios';
  public id :string;
  public seleccionCurso: EventEmitter<string> = new EventEmitter<string>();
  public seleccionUsuario: EventEmitter<string> = new EventEmitter<string>();
  public cursos:Curso[] = [];
  public usuarios:Usuario[]=[];

  constructor(private usuarioService :UsuarioService,
    private cursoService:CursosService,
    private busquedaService:BusquedasService) { }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo:'cursos'|'usuarios'){
    this._ocultarModal=false;
    this.tipo = tipo;

    switch(tipo){
      case 'cursos':
       this.cursoService.cargarCursos()
       .subscribe((cursos:Curso[])=>{
          this.cursos=cursos;
       });
        break;
      case 'usuarios':
        this.usuarioService.cargarTodosUsuaris()
        .subscribe(({usuarios})=>{
          this.usuarios=usuarios;
        });
        break;
    }

  }

  cargar(tipo:'cursos'|'usuarios'){

    switch(tipo){
      case 'cursos':
       this.cursoService.cargarCursos()
       .subscribe((cursos:Curso[])=>{
          this.cursos=cursos;
       });
        break;
      case 'usuarios':
        this.usuarioService.cargarTodosUsuaris()
        .subscribe(({usuarios})=>{
          this.usuarios=usuarios;
        });
        break;
    }
  }

  cerrarModal(){
    this._ocultarModal=true;
  }

  buscar(tipo:'usuarios'|'cursos',termino:string){
    switch(tipo){
      case 'cursos':
        this.busquedaService.buscar(tipo,termino).subscribe((resp:Curso[])=>{
          this.cursos=resp;
        });
        break;
      case 'usuarios':
        this.busquedaService.buscar(tipo,termino).subscribe((resp:Usuario[])=>{
          this.usuarios=resp;
        });
        break;
    }
  }
}
