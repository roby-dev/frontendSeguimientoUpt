import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Seccion } from 'src/app/models/seccion.model';
import { AvanceService } from 'src/app/services/avance.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { MicursoComponent } from '../micurso.component';

@Component({
  selector: 'app-miavance',
  templateUrl: './miavance.component.html',
  styles: [
  ]
})
export class MiavanceComponent implements OnInit {
  public cargando:boolean=true;
  public seccionSeleccionada:Seccion;
  public avanceForm1:FormGroup;
  public avanceForm2:FormGroup;
  public avanceForm3:FormGroup;
  public
  constructor(
    private fb:FormBuilder,
    private seccionService:SeccionService,
    private activatedRoute: ActivatedRoute,
    private avanceService:AvanceService

  ) {
    let id=localStorage.getItem("seccion").toString();
    this.cargarSeccion(id);
   }

  ngOnInit(): void {
    this.avanceForm1 = this.fb.group({
      fecha:['',Validators.required],
    });

    this.avanceForm2 = this.fb.group({
      fecha:['',Validators.required],
    });

    this.avanceForm3 = this.fb.group({
      fecha:['',Validators.required],
    });
  }

  guardarAvance(numero:number){

  }

  cargarSeccion(id:string){
    if (id === 'nuevo') {
      return;
    }

    this.seccionService
      .obtenerSeccionPorId(id)
      .subscribe((seccion) => {
        if (!seccion) {
          //return this.router.navigateByUrl(`/dashboard/miscursos`);
        }
        this.seccionSeleccionada=seccion;
        this.cargando=false;
      });
  }

}
