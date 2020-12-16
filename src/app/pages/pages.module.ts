import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import{ CursosComponent} from './cursos/cursos.component';
import{ CursoComponent} from './cursos/curso/curso.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ActualizarComponent } from './usuarios/actualizar/actualizar.component';
import { SeccionComponent } from './secciones/seccion/seccion.component';
import { SeccionesComponent } from './secciones/secciones.component';
import { ComponentsModule } from '../components/components.module';
import { MiscursosComponent } from './miscursos/miscursos.component';
import { MicursoComponent } from './miscursos/micurso/micurso.component';
import { InformacionComponent } from './informacion/informacion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { AvanceComponent } from './avance/avance.component';
import { ActasComponent } from './actas/actas.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { InformesComponent } from './informes/informes.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CursosComponent,
    PagesComponent,
    CursoComponent,
    UsuarioComponent,
    UsuariosComponent,
    ActualizarComponent,
    SeccionComponent,
    SeccionesComponent,
    MiscursosComponent,
    MicursoComponent,
    InformacionComponent,
    PerfilComponent,
    MensajesComponent,
    AvanceComponent,
    ActasComponent,
    NotificacionesComponent,
    InformesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    PipesModule,
    ComponentsModule
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    CursosComponent,
    CursoComponent,
    UsuarioComponent,
    UsuariosComponent,
    ActualizarComponent,
    SeccionComponent,
    SeccionesComponent,
    MiscursosComponent,
    MicursoComponent,
    InformacionComponent,
    PerfilComponent,
    MensajesComponent,
    AvanceComponent,
    ActasComponent,
    NotificacionesComponent,
    InformesComponent
  ],
})
export class PagesModule {}
