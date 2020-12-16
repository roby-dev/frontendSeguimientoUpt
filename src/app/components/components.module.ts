import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalTablasComponent } from './modal-tablas/modal-tablas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalSeccionComponent } from './modal-seccion/modal-seccion.component';
import { ModalPasswordComponent } from './modal-password/modal-password.component';
import { MensajeComponent } from './mensaje/mensaje.component';

@NgModule({
  declarations: [ModalTablasComponent, ModalSeccionComponent,ModalPasswordComponent,MensajeComponent],
  exports:[ModalTablasComponent,ModalSeccionComponent,ModalPasswordComponent,MensajeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
