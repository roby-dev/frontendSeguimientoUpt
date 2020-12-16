import { Component, OnInit } from '@angular/core';
import { MensajeService } from 'src/app/services/mensaje.service';
declare function chatInitFunctions();

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styles: [
  ]
})
export class MensajeComponent implements OnInit {
  constructor(
    public mensajeService:MensajeService
  ) { }

  ngOnInit(): void {
    chatInitFunctions();
  }

}
