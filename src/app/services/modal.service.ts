import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso.model';
import { Seccion } from '../models/seccion.model';
import { Usuario } from '../models/usuario.model';
import { BusquedaService } from './busqueda.service';
import { BusquedasService } from './busquedas.service';
import { CursosService } from './cursos.service';
import { SeccionService } from './seccion.service';
import { UsuarioService } from './usuario.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultarModal: boolean = true;
  public tipo:'cursos' | 'usuarios' |'secciones';
  public id :string;
  public seleccionCurso: EventEmitter<string> = new EventEmitter<string>();
  public seleccionUsuario: EventEmitter<string> = new EventEmitter<string>();
  public seleccionSeccion: EventEmitter<string> = new EventEmitter<string>();
  public cursos:Curso[] = [];
  public usuarios:Usuario[]=[];
  public secciones:Seccion[]=[];

  constructor(private usuarioService :UsuarioService,
    private cursoService:CursosService,
    private busquedaService:BusquedasService,
    private seccionService:SeccionService) { }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo:'cursos'|'usuarios'|'secciones'){
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
      case 'secciones':
        this.seccionService.cargarSecciones()
        .subscribe((secciones:Seccion[])=>{
          this.secciones=secciones;
        });
        break;
    }

  }

  cargar(tipo:'cursos'|'usuarios'|'secciones'){

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
      case 'secciones':
        this.seccionService.cargarSecciones()
        .subscribe((secciones:Seccion[])=>{
          this.secciones=secciones;
        })
    }
  }

  cerrarModal(){
    this._ocultarModal=true;
  }

  buscar(tipo:'usuarios'|'cursos'|'secciones',termino:string){
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
      case 'secciones':
        this.busquedaService.buscar(tipo,termino).subscribe((resp:Seccion[])=>{
          this.secciones=resp;
        });
        break;
    }
  }
}
