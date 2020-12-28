import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Seccion } from 'src/app/models/seccion.model';
import { Silabus } from 'src/app/models/silabus.mode';
import { CursosService } from 'src/app/services/cursos.service';
import { ModalService } from 'src/app/services/modal.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { SilaboService } from 'src/app/services/silabo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-silabus',
  templateUrl: './silabus.component.html',
  styles: [
  ]
})
export class SilabusComponent implements OnInit {

  public seccionSeleccionada : Seccion;
  public cargando : boolean = true;
  public ingresado:boolean=false;
  public semanas:number[]=[];
  public silabusSeleccionado:Silabus;
  public silaboForm: FormGroup;
  public secciones:Seccion[];
  private seccionSubs:Subscription;
  private conceptual:[{
    semana:number,
    contenidoConceptual:string
  }];

  private procedimental:[{
    semana:number,
    contenidoProcedimental:string
  }];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private silaboService:SilaboService,
    private seccionService:SeccionService,
    private modalService:ModalService
  ) {
    for(let i=0;i<17;i++){
      this.semanas[i]=i+1;
    }
  }

  ngOnInit(): void {

    this.silaboForm = this.fb.group({
      semanas: [17, Validators.required],
      nombreseccion: ['', Validators.required],
      seccion:['',Validators.required],
      contenidoConceptual1:[''],
      contenidoConceptual2:[''],
      contenidoConceptual3:[''],
      contenidoConceptual4:[''],
      contenidoConceptual5:[''],
      contenidoConceptual6:[''],
      contenidoConceptual7:[''],
      contenidoConceptual8:[''],
      contenidoConceptual9:[''],
      contenidoConceptual10:[''],
      contenidoConceptual11:[''],
      contenidoConceptual12:[''],
      contenidoConceptual13:[''],
      contenidoConceptual14:[''],
      contenidoConceptual15:[''],
      contenidoConceptual16:[''],
      contenidoConceptual17:[''],
      contenidoProcedimental1:[''],
      contenidoProcedimental2:[''],
      contenidoProcedimental3:[''],
      contenidoProcedimental4:[''],
      contenidoProcedimental5:[''],
      contenidoProcedimental6:[''],
      contenidoProcedimental7:[''],
      contenidoProcedimental8:[''],
      contenidoProcedimental9:[''],
      contenidoProcedimental10:[''],
      contenidoProcedimental11:[''],
      contenidoProcedimental12:[''],
      contenidoProcedimental13:[''],
      contenidoProcedimental14:[''],
      contenidoProcedimental15:[''],
      contenidoProcedimental16:[''],
      contenidoProcedimental17:[''],

    });

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarSilabo(id);
    });

    this.cargarSecciones();

    this.seccionSubs = this.modalService.seleccionSeccion.subscribe((id)=>{
      this.seccionService.obtenerSeccionPorId(id)
      .subscribe((seccion:Seccion)=>{
        this.silaboForm.get('nombreseccion').setValue(seccion.nombre);
        this.silaboForm.get('seccion').setValue(seccion._id);
        this.seccionSeleccionada=seccion;
        this.modalService.cerrarModal();
      });
    });
  }

  cargarSecciones() {
    this.seccionService
      .cargarSecciones()
      .subscribe((secciones: Seccion[]) => {
        this.secciones = secciones;
      });
  }

  abrirModal(tipo:'usuarios'|'cursos'|'secciones'){
    this.modalService.abrirModal(tipo);
  }


  cargarSilabo(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.silaboService
      .obtenerSilaboPorId(id)
      .subscribe((silabo) => {
        if (!silabo) {
          return this.router.navigateByUrl(`/dashboard/silabus`);
        }

        let nombreseccion=silabo.seccion.nombre;
        let seccion=silabo.seccion._id;
        let semanas=silabo.semanas;


        this.silabusSeleccionado = silabo;
        this.silaboForm.get('nombreseccion').setValue(nombreseccion);
        this.silaboForm.get('seccion').setValue(seccion);
        this.silaboForm.get('semanas').setValue(semanas);

        for(let i=0;i<17;i++){
          this.silaboForm.get(`contenidoConceptual${i+1}`).setValue(silabo.conceptual[i].contenidoConceptual)
          this.silaboForm.get(`contenidoProcedimental${i+1}`).setValue(silabo.procedimental[i].contenidoProcedimental)
      }

        this.seccionService.obtenerSeccionPorId(seccion).subscribe((seccion:Seccion)=>{
          this.seccionSeleccionada=seccion;
        })
      });
  }

  guardarSilabo() {

    if (this.silabusSeleccionado) {


      for(let i=0;i<17;i++){
        this.conceptual[i]={
          semana:(i+1),
          contenidoConceptual:this.silaboForm.get(`contenidoConceptual${i+1}`).value,
        };
        this.procedimental[i]={
          semana:(i+1),
          contenidoProcedimental:this.silaboForm.get(`contenidoProcedimental${i+1}`).value,
        };
      }

      let silabo = new Silabus(this.silaboForm.get('seccion').value,this.silaboForm.get('semanas').value,this.conceptual,this.procedimental,this.silabusSeleccionado._id);

      this.silaboService.actualizarSilabus(silabo).subscribe((resp) => {
        Swal.fire(
          'Actualizado',
          `Contenido para ${this.seccionSeleccionada.nombre} actualizado correctamente`,
          'success'
        );
        this.router.navigateByUrl(`/dashboard/silabus`);
      },
      (error) => {
          Swal.fire('Error!', error.error.msg, 'error');
      });
    } else {

      for(let i=0;i<17;i++){
        this.conceptual[i]={
          semana:(i+1),
          contenidoConceptual:this.silaboForm.get(`contenidoConceptual${i+1}`).value,
        };
        this.procedimental[i]={
          semana:(i+1),
          contenidoProcedimental:this.silaboForm.get(`contenidoProcedimental${i+1}`).value,
        };
      }

      let silabo = new Silabus(this.silaboForm.get('seccion').value,this.silaboForm.get('semanas').value,this.conceptual,this.procedimental);

      console.log(silabo);
      this.silaboService
        .crearSilabo(silabo)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `Contenido para ${this.seccionSeleccionada.nombre} creado`, 'success');
          this.router.navigateByUrl(`/dashboard/silabus`);
        },(error) => {
          Swal.fire('Error!', error.error.msg, 'error');
      });
    }
  }
}
