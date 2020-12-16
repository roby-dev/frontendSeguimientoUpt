import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ModalPasswordService {
  private _ocultarModal: boolean = true;
  public  usuario:Usuario;

  constructor(
    private usuarioService:UsuarioService
  ) { }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(){
    this._ocultarModal=false;
  }

  cerrarModal(){
    this._ocultarModal=true;
  }
}
