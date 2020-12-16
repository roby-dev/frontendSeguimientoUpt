import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalPasswordService } from 'src/app/services/modal-password.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.component.html',
  styles: [
  ]
})
export class ModalPasswordComponent implements OnInit {
  public usuario :Usuario;
  public comprobada:boolean=false;
  public formSubmitted = false;
  public passwordForm:FormGroup;
  public newPasswordForm:FormGroup;
  public contrasenaValida:boolean=false;

  constructor(
    public modalPasswordService:ModalPasswordService,
    public usuarioService:UsuarioService,
    private fb:FormBuilder,
    private router: Router,
  ) {
    this.usuario = this.usuarioService.usuario;
   }

  ngOnInit(): void {

    this.asignarForms();


  }

  asignarForms(){
    this.newPasswordForm = this.fb.group({
      uid:[this.usuario.uid,Validators.required]      ,
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
    },  {
      validators: this.passwordsIguales('pass1', 'pass2'),
    });


    this.passwordForm = this.fb.group({
      uid:[this.usuario.uid,Validators.required]      ,
      password:['',Validators.required]
    });

  }

  comprobarPassword(){
    this.formSubmitted = true;
    if(this.passwordForm.invalid){
      return;
    }
    this.usuarioService.comprobarPassword(this.passwordForm.value).
    subscribe((resp)=>{
      this.comprobada=true;
      this.contrasenaValida=false;
    },(error)=>{
      this.comprobada=false;
      this.contrasenaValida=true;
    });
  }

  cambiarPassword(){
    if(this.newPasswordForm.invalid){
      return;
    }

    this.usuarioService.cambiarPassword(this.newPasswordForm.value)
    .subscribe((resp)=>{
      this.cerrarModal();
      Swal.fire('Creado', `contraseña actualizada correctamente`, 'success');
      this.router.navigateByUrl(`/dashboard/perfil`);
    },(error)=>{

    })

  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }

  cerrarModal(){
    this.modalPasswordService.cerrarModal();
    this.passwordForm.reset();
    this.newPasswordForm.reset();
    this.asignarForms();
    this.comprobada=false;
    this.contrasenaValida=false;
  }

  contrasenasNoValidas() {
    const pass1 = this.newPasswordForm.get('pass1').value;
    const pass2 = this.newPasswordForm.get('pass2').value;
    if (pass1 != pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
