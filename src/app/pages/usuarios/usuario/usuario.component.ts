import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

import { delay } from 'rxjs/operators';

import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Seccion } from 'src/app/models/seccion.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  public usuarioForm: FormGroup;
  public usuarioSeleccionado: Usuario;
  public formSubmitted = false;
  public secciones: Seccion[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      role: ['', Validators.required]
    }, {
      validators: this.passwordsIguales('password', 'password2'),
    });
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

  guardarUsuario() {
    this.formSubmitted = true;
    if (this.usuarioForm.invalid) {
      return;
    }
    const { nombres, apellidos } = this.usuarioForm.value;
    this.usuarioService
      .crearUsuario(this.usuarioForm.value)
      .subscribe((resp: any) => {
        Swal.fire('Creado', `${nombres} ${apellidos}  creado correctamente`, 'success');
        this.usuarioForm.reset();
        this.router.navigateByUrl(`/dashboard/usuarios`);
      });
  }

  campoNoValido(campo: string): boolean {
    if (this.usuarioForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.usuarioForm.get('password').value;
    const pass2 = this.usuarioForm.get('password2').value;
    if (pass1 != pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

}





