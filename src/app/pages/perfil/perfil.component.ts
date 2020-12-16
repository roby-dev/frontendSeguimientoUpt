import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalPasswordService } from 'src/app/services/modal-password.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  private usuario: Usuario;
  public perfilForm:FormGroup;
  public imagenSubir:File;
  public imgTemp:any = null;



  constructor(
    private usuarioService:UsuarioService,
    private fb:FormBuilder,
    private fileuploadService:FileUploadService,
    private modalService:ModalPasswordService
  ) {
    this.usuario=usuarioService.usuario;
  }

  abrirModal(){
    this.modalService.abrirModal();
  }


  ngOnInit(): void {
    let role="";
    switch(this.usuario.role){
      case 'DOCENTE_ROLE':
        role="DOCENTE";
        break;
      case 'DIRECTOR_ROLE':
        role="DIRECTOR";
        break;
      case 'SUPERVISOR_ROLE':
        role="SUPERVISOR";
        break;
    }
    this.perfilForm = this.fb.group({
      nombres: [this.usuario.nombres, Validators.required],
      apellidos: [this.usuario.apellidos, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      role:[this.usuario.role,Validators.required],
      tipo:[role,Validators.required]
    });
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(
      (resp: Response) => {
        const { nombres,apellidos, email ,role} = this.perfilForm.value;
        this.usuario.nombres = nombres;
        this.usuario.apellidos = apellidos;
        this.usuario.email = email;
        this.usuario.role=role;
        Swal.fire('Correcto', 'Actualizado correctamente', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {

    this.fileuploadService
    .actualizarFoto(this.imagenSubir, this.usuario.uid)
    .then((img) => {
      this.usuario.imagen = img;
      Swal.fire('Correcto', 'Imagen actualizada correctamente', 'success');
    })
    .catch((err) => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
  }
}
