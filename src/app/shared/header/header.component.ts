import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public link:NodeListOf<Element>;
  public usuario: Usuario;
  public barra: HTMLElement;
  public modoNocturno:boolean=true;

  constructor(private usuarioService: UsuarioService, private router: Router,private settingsService : SettingsService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.barra = document.getElementById('busqueda');
    this.link = document.querySelectorAll('.selector');
    this.settingsService.checkCurrentTheme(this.link);
    if(this.settingsService.checkTheme()=='blue-dark.css'){
      this.modoNocturno=false;
    }else{
      this.modoNocturno=true;
    }
  }

  logout() {
    this.usuarioService.logout();
  }

  changeTheme(theme:string){
    if(theme=='blue-dark'){
      this.modoNocturno=false;
    }else{
      this.modoNocturno=true;
    }
    this.settingsService.changeTheme(theme,this.link);
  }


  buscar(termino: string) {
    if (termino.length === 0) {
      return this.router.navigateByUrl('/dashboard');
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
