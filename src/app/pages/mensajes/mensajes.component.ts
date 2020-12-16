import { Component, OnInit } from '@angular/core';
import { MensajeComponent } from 'src/app/components/mensaje/mensaje.component';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styles: [
  ]
})
export class MensajesComponent implements OnInit {
  public usuarios:Usuario[];
  public usuariosTmp:Usuario[];
  constructor(
    private usuarioService:UsuarioService,
    private busquedaService:BusquedasService,
    public mensajeService:MensajeService
  ) {
    this.usuarioService.cargarTodosUsuaris()
    .subscribe(({usuarios})=>{
        this.usuarios=usuarios;
        this.usuariosTmp=usuarios;
    });
  }

  ngOnInit(): void {

  }

  buscar(termino :string){
    if(termino.length==0){
      return(this.usuarios=this.usuariosTmp);
     }else{
       this.busquedaService.buscar('usuarios',termino).subscribe((usuarios:Usuario[])=>{
         this.usuarios=usuarios;
       });
     }
  }

}
