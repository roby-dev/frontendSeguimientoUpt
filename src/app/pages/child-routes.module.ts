import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { ActasComponent } from './actas/actas.component';
import { AvanceComponent } from './avance/avance.component';
import { CursoComponent } from './cursos/curso/curso.component';
import { CursosComponent } from './cursos/cursos.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InformacionComponent } from './informacion/informacion.component';
import { InformesComponent } from './informes/informes.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MicursoComponent } from './miscursos/micurso/micurso.component';
import { MiscursosComponent } from './miscursos/miscursos.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SeccionComponent } from './secciones/seccion/seccion.component';
import { SeccionesComponent } from './secciones/secciones.component';
import { ActualizarComponent } from './usuarios/actualizar/actualizar.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


//Mantenimientos

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Inicio' } },

  //Gestion
  {
    path:'cursos',
    canActivate:[AdminGuard],
    component:CursosComponent,
    data:{title:'Gestión de Cursos'},
  },
  {
    path:'curso/:id',
    canActivate:[AdminGuard],
    component:CursoComponent,
    data:{title:'Gestión de Curso'},
  },
  {
    path:'usuarios',
    canActivate:[AdminGuard],
    component:UsuariosComponent,
    data:{title:'Gestión de Usuarios'}
  },
  {
    path:'usuario/:id',
    canActivate:[AdminGuard],
    component:UsuarioComponent,
    data:{title:'Gestión de Usuario'}
  },
  {
    path:'actualizar/:id',
    canActivate:[AdminGuard],
    component:ActualizarComponent,
    data:{title:'Actualizar Usuario'}
  },
  {
    path:'secciones',
    canActivate:[AdminGuard],
    component:SeccionesComponent,
    data:{title:'Gestión de Secciones'}
  },
  {
    path:'seccion/:id',
    canActivate:[AdminGuard],
    component:SeccionComponent,
    data:{title:'Gestión de Sección'}
  },
  {
    path:'miscursos',
    component:MiscursosComponent,
    data:{title:'Mis Cursos'}
  },
  {
    path:'micurso/:id',
    component:MicursoComponent,
    data:{title:'Mi Curso'}
  },
  {
    path:'informacion',
    component:InformacionComponent,
    data:{title:'Información'}
  },
  {
    path:'perfil',
    component:PerfilComponent,
    data:{title:'Perfil de Usuario'}
  },
  {
    path:'mensajes',
    component:MensajesComponent,
    data:{title:'Mis mensajes'}
  },
  {
    path:'avance',
    component:AvanceComponent,
    data:{title:'Avances'}
  },
  {
    path:'actas',
    canActivate:[AdminGuard],
    component:ActasComponent,
    data:{title:'Actas'},
  },
  {
    path:'informes',
    canActivate:[AdminGuard],
    component:InformesComponent,
    data:{title:'Informes'},
  },
  {
    path:'notificaciones',
    component:NotificacionesComponent,
    data:{title:'Notificaciones'},
  }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
