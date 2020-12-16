import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo: string;
  public tituloSubs$: Subscription;
  public subtitulo:string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.tituloSubs$ = this.getArgumentosRuta().subscribe((data) => {
      this.titulo = data.title;
      this.subtitulo = route.children[0].snapshot.routeConfig.path;
      this.subtitulo =this.subtitulo.split('/')[0];
      switch(this.subtitulo.toUpperCase()){
        case 'CURSOS':
          this.subtitulo='Gestión';
          break;
        case 'CURSO':
          this.subtitulo='Gestión';
          break;
        case '':
          this.subtitulo='Inicio';
          break;
        case 'USUARIOS':
            this.subtitulo='Gestión';
            break;
        case 'USUARIO':
            this.subtitulo='Gestión';
            break;
      }

      document.title = `UPT Seguimiento - ${data.title}`;
    });
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }
}
