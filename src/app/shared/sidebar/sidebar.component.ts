import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Seccion } from 'src/app/models/seccion.model';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SeccionService } from 'src/app/services/seccion.service';
import { SettingsService } from 'src/app/services/settings.service';

import {io} from 'socket.io-client';

import { environment } from 'src/environments/environment';

const url = environment.url;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})

export class SidebarComponent implements OnInit {
  public usuario: Usuario;
  public secciones: Seccion[] = [];
  public seccionSubs : Subscription;
  public modoNocturno:boolean=true;
  public link:NodeListOf<Element>;
  public socket:any;
  public data:any;
  public cantidad:boolean = false;


  constructor(
    public sidebarService: SidebarService,
    private usuarioService: UsuarioService,
    private seccionService:SeccionService,
    private settingsService:SettingsService
  ) {

    this.socket = io(url);
    this.usuario = usuarioService.usuario;
  }

  changeTheme(theme:string){
    if(theme=='blue-dark'){
      this.modoNocturno=false;
    }else{
      this.modoNocturno=true;
    }
    this.settingsService.changeTheme(theme,this.link);
  }

  ngOnInit(): void {
    this.cargarSecciones();


    this.seccionSubs=this.usuarioService.agregarSeccion.pipe(delay(50)).subscribe((valor)=>{
      this.socket.emit('cargarSecciones',valor);
    })

    this.link = document.querySelectorAll('.selector');
    this.settingsService.checkCurrentTheme(this.link);
    if(this.settingsService.checkTheme()=='blue-dark.css'){
      this.modoNocturno=false;
    }else{
      this.modoNocturno=true;
    }

    this.socket.on('seccionesCargadas',(id)=>{
      if(id==this.usuario.uid){
        this.cargarSecciones();
      }
    });
  }

  cargarSecciones(){
    this.seccionService.cargarSeccionPorDocente(this.usuario.uid)
    .subscribe((secciones:Seccion[])=>{
      this.secciones=secciones;
      if(this.secciones){
        this.cantidad=true;
      }else{
        this.cantidad=false;
      }
    });
  }
}
