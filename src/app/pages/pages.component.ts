import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions();


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})
export class PagesComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.sidebarService.cargarMenu();
    customInitFunctions();

  }
}
